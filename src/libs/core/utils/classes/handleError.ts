export default class HandleError<T = unknown> extends Error {
  content: T;

  constructor(content: T = {} as T, message?: string) {
    super(message);
    Object.setPrototypeOf(this, HandleError.prototype);
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, HandleError);
    }
    this.name = 'HandleError';
    this.content = content;
  }
}