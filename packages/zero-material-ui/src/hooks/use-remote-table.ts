import { useState, Dispatch, SetStateAction, useRef, MutableRefObject, useEffect } from 'react';
import { Query, Column } from 'material-table';
import * as ApolloReactCommon from '@apollo/client';
import { WebRelay } from '@0soft/zero-lib/src/web/relay';
import { safeAsyncWeb } from '../safe-async';
import { SafeAsyncOptions } from '@0soft/zero-lib/src/safe-async-core';

export interface SafeAsyncOptionsExtra<T> extends Omit<SafeAsyncOptions<T>, 'successCondition'> {
  successCondition?: boolean | ((res: T) => boolean);
}

export interface TableQueryVariables {
  first?: number;
  orderby?: string[];
  after?: string;
  search?: string;
}

export const orderbyTableToQuery = (
  orderBy: Column<any> & { orderFields: string[] },
  orderDirection: 'asc' | 'desc'
) =>
  orderBy.orderFields != null
    ? orderBy.orderFields.map(it => `${orderDirection === 'desc' ? '-' : ''}${it}`)
    : [`${orderDirection === 'desc' ? '-' : ''}${orderBy.field?.toString()}`];

export interface RemoteTableEditableItem<MutationResult = any> {
  mutation: (options?: ApolloReactCommon.MutationFunctionOptions<any> | undefined) => Promise<any>;
  optimisticResponse?: (rowData: MutationResult) => any;
  updateFn?: (
    query: ApolloReactCommon.QueryResult<any, TableQueryVariables>,
    key: string,
    id?: string
  ) => (proxy: any, mutationResult: MutationResult) => any;
  varMap?: (rowData: any) => any;
  asyncOptions?: SafeAsyncOptionsExtra<MutationResult>;
  isBatch?: boolean;
}

export interface RemoteTableEditableOptions<
  CMutationResult = any,
  UMutationResult = any,
  DMutationResult = any
> {
  create?: RemoteTableEditableItem<CMutationResult>;
  update?: RemoteTableEditableItem<UMutationResult>;
  delete?: RemoteTableEditableItem<DMutationResult>;
}

export interface RemoteTableOptions<
  CMutationResult = any,
  UMutationResult = any,
  DMutationResult = any
> {
  t: any;
  query: ApolloReactCommon.QueryResult<any, TableQueryVariables>;
  key: string;
  entityName?: string;
  dataMapFn?: (data: any) => any;
  defaultOrderBy: string[];
  editableMutations?: RemoteTableEditableOptions<
    CMutationResult,
    UMutationResult,
    DMutationResult
  > & { [key: string]: RemoteTableEditableItem<any> };
}

export interface EditableHandler {
  onRowAdd: (rowData: any) => void;
  onRowUpdate: (rowData: any) => void;
  onRowDelete: (rowData: any) => void;
}

export interface RemoteTableDataHook {
  tableDataFn: (tableQuery: Query<any>) => Promise<any>;
  firstFetch: boolean;
  setFirstFetch: Dispatch<SetStateAction<boolean>>;
  tableRef: MutableRefObject<any>;
  isLoading: boolean;
  editable: EditableHandler;
  filters: any;
  setFilters: Dispatch<SetStateAction<any>>;
}

export const useRemoteTable = <
  CMutationResult = any,
  UMutationResult = any,
  DMutationResult = any
>({
  t,
  query,
  key,
  entityName,
  defaultOrderBy,
  dataMapFn,
  editableMutations,
}: RemoteTableOptions<CMutationResult, UMutationResult, DMutationResult>): RemoteTableDataHook => {
  const tableRef = useRef<any>();
  const [firstFetch, setFirstFetch] = useState(true);
  const [filters, setFilters] = useState<any>(null);
  const editable: any = {};
  entityName = entityName ?? key.charAt(0).toUpperCase() + key.slice(1);

  useEffect(() => {
    setTimeout(() => {
      if (filters != null) {
        if (tableRef.current != null) {
          tableRef.current.onQueryChange();
        }
      }
    });
  }, [filters]);

  const tableDataFn = async (tableQuery: Query<any>) => {
    return new Promise<any>(async (resolve, reject) => {
      if (firstFetch) {
        setFirstFetch(false);
        return resolve({
          data: dataMapFn != null ? dataMapFn(query.data) : query.data,
          page: tableQuery.page || 0,
          totalCount: query?.data != null ? query?.data[key]?.totalCount || 0 : 0,
        });
      }
      try {
        const res = await query.refetch({
          first: tableQuery.pageSize,
          orderby:
            tableQuery.orderBy != null
              ? orderbyTableToQuery(tableQuery.orderBy as any, tableQuery.orderDirection).concat(
                  defaultOrderBy
                )
              : defaultOrderBy,
          after:
            tableQuery.page > 0
              ? WebRelay.encodeCursor(tableQuery.page * tableQuery.pageSize - 1)
              : undefined,
          search: tableQuery.search,
          ...filters,
        });
        if (res.data) {
          resolve({
            data: dataMapFn != null ? dataMapFn(res.data) : res.data,
            page: tableQuery.page || 0,
            totalCount: res.data != null ? res.data[key]?.totalCount || 0 : 0,
            pageSize: tableQuery.pageSize || 10,
          });
        }
      } catch (e) {
        reject(e);
      }
    });
  };

  if (editableMutations != null) {
    const handlers = ['onRowAdd', 'onRowUpdate', 'onRowDelete'];
    ['create', 'update', 'delete'].forEach((action: string, idx: number) => {
      const capAction = action.charAt(0).toUpperCase() + action.slice(1);
      if (editableMutations[action] != null) {
        const batchKey = editableMutations[action].isBatch ? 'Batch' : '';
        editable[handlers[idx]] = async (rowData: any) => {
          await safeAsyncWeb(
            () =>
              editableMutations[action].mutation!({
                variables: {
                  ...(editableMutations[action].varMap != null
                    ? editableMutations[action].varMap!(rowData)
                    : rowData),
                },
                optimisticResponse:
                  editableMutations[action].optimisticResponse != null
                    ? editableMutations[action].optimisticResponse!(rowData)
                    : undefined,
                update:
                  editableMutations[action].updateFn != null
                    ? editableMutations[action].updateFn!(query, key, rowData.id)
                    : undefined,
              }),
            {
              // key + capAction = ingredientDelete | key.slice = ingredients -> ingredient
              successCondition: res =>
                res.data[key.slice(0, -1) + batchKey + capAction][key.slice(0, -1)] != null,
              successMessage: t('{{"{{entityName}}"}} {{"{{action}}"}}d successfully!', {
                entityName,
                action,
              }),
              errorMessage: (errors: string) =>
                errors ??
                t('Error while trying to {{"{{action}}"}} {{"{{entityName}}"}}. Try again later.', {
                  entityName,
                  action,
                }),
              ...(editableMutations[action].asyncOptions || {}),
            }
          );
        };
      }
    });
  }
  return {
    tableDataFn,
    firstFetch,
    setFirstFetch,
    tableRef,
    isLoading: query.loading,
    editable,
    filters,
    setFilters,
  };
};
