import { safeAsyncCore } from '@edusig/zero-lib/src/safe-async-core';
import { WebSnackbar } from './feedback/global-snackbar';

export const safeAsyncWeb = safeAsyncCore({
  dangerFeedback: (message: string) => WebSnackbar.showDangerSnackbar(message),
  successFeedback: (message: string) => WebSnackbar.showSuccessSnackbar(message),
  supressConsoleError: true,
});
