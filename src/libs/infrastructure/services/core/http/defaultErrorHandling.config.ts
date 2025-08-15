import HandleError from '../../../../shared/utils/classes/handleError';

const DEFAULT_ERROR_MESSAGE = 'Lo sentimos, ha ocurrido un error.';

const defaultErrorHandling = (
  error: unknown,
  customDefaultErrorMessage: string | false = false,
  shouldReturnErrorCodeFirst = false
): never => {
  let errorMessage: string | undefined;

  const responseError = error as {
    response?: { data?: { error?: { code?: string; description?: string } } };
  };

  if (responseError.response?.data?.error) {
    const { code, description } = responseError.response.data.error;
    errorMessage = shouldReturnErrorCodeFirst ? code || description : description || code;
  }

  if (!errorMessage || errorMessage === 'unhandled.error') {
    errorMessage = DEFAULT_ERROR_MESSAGE;
  }

  if (customDefaultErrorMessage) {
    errorMessage = customDefaultErrorMessage;
  }

  throw new HandleError(responseError.response, errorMessage);
};

export default defaultErrorHandling;
