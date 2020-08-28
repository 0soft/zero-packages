/**
 * A generic url build customizable
 *
 * @param url target url
 * @param options configure the parts of url, a object of params, the base url to prepend
 * to the target and flags to filter null params and parts
 */
export const urlBuilder = (
  url: string,
  options: {
    parts?: string[] | undefined;
    params?: { [key: string]: any | undefined };
    base?: string;
    filterNullParamKeys?: boolean;
    filterNullPartsItem?: boolean;
  }
): string => {
  const filterParam = options.filterNullParamKeys != null ? options.filterNullParamKeys : true;
  const filterParts = options.filterNullPartsItem != null ? options.filterNullPartsItem : true;
  const newURL = options.base != null && !/(https?)?\/\//gi.test(url) ? options.base + url : url;
  if (options.params != null || options.parts != null) {
    const param =
      options.params != null
        ? Object.keys(options.params)
            .filter(it => !filterParam || options.params![it] != null)
            .map(it => `${it}=${options.params![it]}`)
            .join('&')
        : '';
    return `${newURL}${
      options.parts != null
        ? '/' + options.parts.filter(it => !filterParts || it != null).join('/')
        : ''
    }${param.length > 0 ? '?' + param : ''}`;
  }
  return newURL;
};
