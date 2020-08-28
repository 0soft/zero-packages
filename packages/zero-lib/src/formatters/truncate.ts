export const truncString = (it: string, len: number, includeEllipsis = false) =>
  it.length > len ? it.substr(0, len) + (includeEllipsis ? '…' : '') : it;
