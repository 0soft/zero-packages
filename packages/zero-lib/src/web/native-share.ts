export const nativeShare = async (url: string, title?: string) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (navigator.share) {
        await navigator.share({ title, url });
        return resolve();
      }
    } catch (e) {
      reject(e);
    } finally {
      reject();
    }
  });
};
