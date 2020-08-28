export const isExternal = (() => {
  const domainRe = /https?:\/\/((?:[\w\d-]+\.)+[\w\d]{2,})/i;

  return (url: string) => {
    const domain = (u: string) => {
      const res = domainRe.exec(u);
      return res != null && res.length > 0 ? res[1] : '';
    };

    return domain(typeof window !== 'undefined' ? location.href : '') !== domain(url);
  };
})();
