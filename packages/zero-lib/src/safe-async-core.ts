export interface SafeAsyncOptions<T> {
  onSuccess?: (res: T) => any;
  onError?: (e: Error, errors: string[] | undefined, res: T | null) => any;
  onComplete?: (errors: string[] | undefined, res: T | null) => any;
  successCondition: boolean | ((res: T) => boolean);
  errorMessage?: (errors?: string) => string | string;
  successMessage?: (res: T) => string | string;
}

export interface DefaultData {
  [key: string]: any;
  errors?: any[];
}

export interface DefaultResponse {
  data?: DefaultData | undefined | null;
}

export const safeAsyncCore = (config?: {
  successFeedback?: (msg: string) => any;
  dangerFeedback?: (msg: string) => any;
  captureException?: (exception: any, response: any) => any;
  supressConsoleError?: boolean;
}) => async <T extends DefaultResponse | null>(
  asyncFn: () => Promise<T>,
  options: SafeAsyncOptions<T> = {
    successCondition: true,
  }
) => {
  let errors: string[] | undefined;
  let res: T | null = null;
  try {
    res = await asyncFn();
    if (
      typeof options.successCondition === 'function'
        ? !options.successCondition(res)
        : !options.successCondition
    ) {
      if (res?.data != null) {
        const ks = Object.keys(res!.data);
        if (ks.length > 0) {
          errors = ks.reduce(
            (acc, it) =>
              res!.data![it].hasOwnProperty('errors') && res!.data![it].errors.length > 0
                ? acc.concat(res!.data![it].errors.map((err: any) => err.message))
                : acc,
            []
          );
        }
      }
      throw new Error('Unknown');
    } else {
      if (options.onSuccess != null) {
        await options.onSuccess(res);
      }
      if (config?.successFeedback != null && options.successMessage != null) {
        config?.successFeedback(
          typeof options.successMessage === 'function'
            ? options.successMessage(res)
            : options.successMessage
        );
      }
    }
  } catch (e) {
    if (config?.supressConsoleError !== true) {
      /* eslint-disable-next-line */
      console.error(e, errors);
    }
    if (config?.captureException != null) {
      config?.captureException(e, res);
    }
    if (options.onError != null) {
      options.onError(e, errors, res);
    }
    if (config?.dangerFeedback != null && options.errorMessage != null) {
      config?.dangerFeedback(
        typeof options.errorMessage === 'function'
          ? options.errorMessage(errors?.join('. '))
          : options.errorMessage
      );
    }
  } finally {
    if (options.onComplete) {
      options.onComplete(errors, res);
    }
  }
};
