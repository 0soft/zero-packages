import * as React from 'react';
import { Form, FormRenderProps } from 'react-final-form';
import { Grid } from '@material-ui/core';
import { GridSpacing } from '@material-ui/core/Grid';
import styled from 'styled-components';
import { ValidationErrors } from 'final-form';

interface OwnProps {
  initialValues?: any;
  constraint?: any;
  gridSpacing?: GridSpacing;
  render?: (props: FormRenderProps) => any;
  onSubmit: (values: any, form: any) => void;
  validate?: (values: any) => ValidationErrors | Promise<ValidationErrors> | undefined;
}

export const FormItem = styled(Grid).attrs((_: any) => ({
  item: true,
  xs: 12,
}))`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin: ${props => props.theme.spacing(1, 0)};

  ${(props: any) => props.theme.breakpoints.up('sm')} {
    justify-content: flex-start;
  }
`;

export const DefaultForm: React.FC<OwnProps> = ({
  initialValues,
  gridSpacing = 4,
  render,
  onSubmit,
  children,
  validate,
}) => {
  return (
    <Form
      onSubmit={onSubmit}
      initialValues={initialValues}
      validate={validate}
      render={({ ...props }) => (
        <form onSubmit={props.handleSubmit} noValidate>
          <Grid container spacing={gridSpacing}>
            {render?.apply(null, [props as any])}
            {children}
          </Grid>
        </form>
      )}
    ></Form>
  );
};
