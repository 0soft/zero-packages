import { urlBuilder } from '../url-builder';

export const whatsappLink = (options: { phone?: number | string; text?: string }) => {
  const url =
    typeof window !== 'undefined' &&
    (typeof window.orientation !== 'undefined' || navigator.userAgent.indexOf('IEMobile') !== -1)
      ? 'whatsapp://send'
      : 'https://web.whatsapp.com/send';
  const params = { ...options };
  if (options.text != null) {
    params.text = encodeURI(options.text);
  }
  return urlBuilder(url, { params });
};
