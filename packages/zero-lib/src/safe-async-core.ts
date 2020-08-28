export interface SafeAsyncOptions<T> {
  onSuccess?: (res: T) => any;
  onError?: (e: Error) => any;
  onComplete?: () => any;
  successCondition: boolean | ((res: T) => boolean);
  errorMessage?: (errors?: string) => string | string;
  successMessage?: (res: T) => string | string;
}

export const safeAsyncCore = (config?: {
  successFeedback?: (msg: string) => any;
  dangerFeedback?: (msg: string) => any;
  captureException?: (exception: any) => any;
  supressConsoleError?: boolean;
}) => async <T = any>(
  asyncFn: () => Promise<T>,
  options: SafeAsyncOptions<T> = {
    successCondition: true,
  }
): Promise<void> => {
  let errors: string[] = [];
  try {
    const res = (await asyncFn()) as any;
    if (
      typeof options.successCondition === 'function'
        ? !options.successCondition(res)
        : !options.successCondition
    ) {
      if (res.data != null) {
        const ks = Object.keys(res.data);
        if (ks.length > 0) {
          errors = ks.reduce(
            (acc, key) =>
              res.data[key].hasOwnProperty('errors') && res.data[key].errors.length > 0
                ? acc.concat(res.data[key].errors.map((it: any) => it.message))
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
      // eslint-disable-next-line
      console.error(e, errors);
    }
    if (config?.captureException != null) {
      config?.captureException(e);
    }
    if (options.onError != null) {
      options.onError(e);
    }
    if (config?.dangerFeedback != null && options.errorMessage != null) {
      config?.dangerFeedback(
        typeof options.errorMessage === 'function'
          ? options.errorMessage(errors.join('. '))
          : options.errorMessage
      );
    }
  } finally {
    if (options.onComplete) {
      options.onComplete();
    }
  }
};
