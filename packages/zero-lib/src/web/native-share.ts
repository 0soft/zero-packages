export const nativeShare = async (url: string, title?: string) => {
  if (navigator.share) {
    await navigator.share({ title, url });
  }
};
