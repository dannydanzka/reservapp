export interface HandleRequestParams<T = unknown> {
  body?: Record<string, unknown>;
  customDefaultErrorMessage?: string | false;
  endpoint: string;
  extraCustomQuery?: string;
  header?: Record<string, string>;
  method: 'get' | 'post' | 'put' | 'delete' | 'patch';
  mockedResponse?: T | (() => T);
  params?: Record<string, unknown>;
  preProcessResponse?: (res: unknown) => unknown;
  query?: Record<string, unknown>;
  simulate?: boolean;
  shouldReturnErrorCodeFirst?: boolean;
  timeout?: number;
  upload?: UploadFile;
  url: string;
}

export interface UploadFile {
  file: Blob | File;
  filename: string;
  ext?: string;
  inputName: string;
  unique?: boolean;
}
