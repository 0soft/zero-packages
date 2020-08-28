export class WebRelay {
  /** Transforms a base64 relay id to a type and numeric id */
  static decodeId(encoded: string) {
    if (typeof window === 'undefined') {
      encoded = Buffer.from(encoded, 'base64').toString('binary');
    } else {
      encoded = atob(encoded);
    }
    const [type, id] = encoded.split(':');
    return { type, id };
  }
  /** Transforms a type and numeric id to a base64 relay id */
  static encodeId(type: string, id: string) {
    if (typeof window === 'undefined') {
      return Buffer.from(`${type}:${id}`).toString('base64');
    }
    return btoa(`${type}:${id}`);
  }
  static encodeCursor(index: number) {
    return WebRelay.encodeId('arrayconnection', index.toString());
  }
  static decodeCursor(cursor: string) {
    return parseInt(WebRelay.decodeId(cursor).id, 10);
  }
}
