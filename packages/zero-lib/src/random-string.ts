/**
 * Returns a string o lenght @len with a mix of random ASCII characters
 *
 * @param len Length of the random string
 */
const c = '!#$0123456789@ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz-';
export const randomString = (len = 64) =>
  Array.from(Array(len).keys())
    .map(() => c.charAt(Math.floor(Math.random() * c.length)))
    .join('');

export default randomString;
