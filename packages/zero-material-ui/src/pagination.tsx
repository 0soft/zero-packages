import { Button, IconButton, Link, Box, Icon } from '@material-ui/core';
import * as React from 'react';
import styled from 'styled-components';

/**
 * Return the number of pages given a quantity of pages and a quantity per page
 *
 * @param count total quantity of items
 * @param perPage quantity of items per page
 */
export const numberOfPages = (count: number, perPage: number): number => {
  if (perPage === 0 || count === 0) {
    return 0;
  }
  return Math.ceil(count / perPage);
};

/**
 * Return a formated page url replace {PAGE} with the current page
 *
 * @param url Url to be formated
 * @param page Current page
 */
export const formatUrl = (url?: string, page?: number) =>
  url != null
    ? (page || 1) > 1
      ? url.replace('{PAGE}', (page || 1).toString())
      : url.replace('&page={PAGE}', '').replace('?page={PAGE}', '')
    : undefined;

export const wrapLinkIfUrl = (LinkComponent: any, url?: string, as?: string) => (
  button: React.ReactElement,
  page: number,
  extraCondition = true,
  key?: string
) =>
  url != null && extraCondition ? (
    <LinkComponent href={formatUrl(url, page)} as={formatUrl(as, page)} key={key}>
      {button}
    </LinkComponent>
  ) : (
    button
  );

export interface OnPaginationChangeEvent {
  /** The current page */
  page: number;
  /** The quantity of item in each page */
  pageSize: number;
  /** The quantity of pages */
  pageCount: number;
  /** The total quantity of items */
  totalCount: number;
}

interface Props {
  /** The current page */
  page: number;
  /** The quantity of item in each page */
  pageSize: number;
  /** The total quantity of items */
  totalCount: number;
  /** A flag that hides the pagination when there are no items */
  hideWhenEmpty?: boolean;
  /** The URL to be pushed to the location history */
  url?: string;
  /** The URL to the script/page that should be loaded */
  as?: string;
  /** A component to render the link */
  LinkComponent?: any;
  /** Callback called  whenever the page changes */
  onChange?: (e: OnPaginationChangeEvent) => void;
}

const PaginationList = styled.div`
  display: flex;
  justify-content: center;

  button {
    min-width: 3rem;
    min-height: 3rem;
  }

  a {
    min-width: 3rem;
    color: inherit;
    text-decoration: none;
  }
`;

export const Pagination: React.FC<Props> = ({
  page,
  pageSize,
  totalCount,
  onChange,
  hideWhenEmpty = true,
  url,
  LinkComponent = Link,
  as,
}) => {
  // Handlers
  const handleClick = (i: number) => () => {
    if (onChange != null) {
      onChange({ page: i, pageSize, pageCount, totalCount });
    }
  };

  // Use Callback
  const wrapLink = React.useCallback(wrapLinkIfUrl(LinkComponent, url, as), [
    LinkComponent,
    url,
    as,
  ]);

  // Use Memo
  const pageCount = React.useMemo(() => numberOfPages(totalCount, pageSize), [
    totalCount,
    pageSize,
  ]);
  const [FirstButton, PrevButton, NextButton, LastButton] = React.useMemo(
    () =>
      [
        { icon: 'first_page', page: 1, disabled: page === 1 },
        { icon: 'chevron_left', page: page - 1, disabled: page === 1 },
        { icon: 'chevron_right', page: page + 1, disabled: page === pageCount },
        { icon: 'last_page', page: pageCount, disabled: page === pageCount },
      ].map((it, idx) => (
        <IconButton onClick={handleClick(it.page)} disabled={it.disabled} key={idx}>
          <Icon>{it.icon}</Icon>
        </IconButton>
      )),
    [page, pageCount]
  );
  const buttons = React.useMemo(
    () =>
      Array.from(Array(Math.min(pageCount + 2, 5)).keys())
        .filter(it => page + it - 2 >= 1 && page + it - 2 <= pageCount)
        .map((i: number) => {
          const index = page + i - 2;
          return wrapLink(
            <Button onClick={handleClick(index)} color={index === page ? 'primary' : 'default'}>
              {index}
            </Button>,
            index,
            undefined,
            `page-btn-${i}`
          );
        }),
    [page, pageCount]
  );

  if (hideWhenEmpty && totalCount === 0) {
    return null;
  }
  return (
    <Box my={2} width="100%">
      <PaginationList>
        {wrapLink(FirstButton, 1, page > 1)}
        {wrapLink(PrevButton, page - 1, page > 1)}
        {buttons}
        {wrapLink(NextButton, page + 1, page < pageCount)}
        {wrapLink(LastButton, pageCount, page < pageCount)}
      </PaginationList>
    </Box>
  );
};
