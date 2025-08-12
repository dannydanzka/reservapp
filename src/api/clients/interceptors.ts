// HTTP Interceptors
export const REQUEST_INTERCEPTORS = {
  auth: 'auth-interceptor',
  logging: 'logging-interceptor',
};

export const RESPONSE_INTERCEPTORS = {
  error: 'error-interceptor',
  transform: 'transform-interceptor',
};
