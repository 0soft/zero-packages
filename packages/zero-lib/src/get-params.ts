export default function getParams(): any {
  if (!window.location) {
    return {};
  }

  // From: https://stackoverflow.com/a/1099670
  let tokens: RegExpExecArray | null;
  let qs = window.location.search;
  qs = qs.split('+').join(' ');
  const params: any = {};
  const re = /[?&]?([^=]+)=([^&]*)/g;

  /* tslint:disable-next-line */
  while ((tokens = re.exec(qs))) {
    params[decodeURIComponent(tokens[1])] = decodeURIComponent(tokens[2]);
  }

  return params;
}
