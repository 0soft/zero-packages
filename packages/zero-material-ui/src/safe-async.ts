import { safeAsyncCore } from '@0soft/zero-lib';
import { WebSnackbar } from './feedback/global-snackbar';

export const safeAsyncWeb = safeAsyncCore({
  dangerFeedback: (message: string) => WebSnackbar.showDangerSnackbar(message),
  successFeedback: (message: string) => WebSnackbar.showSuccessSnackbar(message),
  supressConsoleError: true,
});
