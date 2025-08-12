/**
 * Clase para manejar errores de la aplicación
 */
class HandleError extends Error {
  public status?: number;
  public code?: string;
  public data?: any;

  constructor(message: string, status?: number, code?: string, data?: any) {
    super(message);
    this.name = 'HandleError';
    this.status = status;
    this.code = code;
    this.data = data;

    // Mantener el stack trace original
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, HandleError);
    }
  }

  /**
   * Crear error desde response de API
   */
  static fromApiError(error: any): HandleError {
    const status = error.response?.status || 500;
    const code = error.response?.data?.code || 'UNKNOWN_ERROR';
    const message = error.response?.data?.message || error.message || 'Error desconocido';
    const data = error.response?.data || null;

    return new HandleError(message, status, code, data);
  }

  /**
   * Crear error genérico
   */
  static create(message: string, status = 500, code = 'GENERIC_ERROR'): HandleError {
    return new HandleError(message, status, code);
  }

  /**
   * Convertir error a objeto serializable
   */
  toJSON() {
    return {
      code: this.code,
      data: this.data,
      message: this.message,
      name: this.name,
      stack: this.stack,
      status: this.status,
    };
  }
}

export default HandleError;
