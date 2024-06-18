
export function isHttpFailureResponse(error: any): boolean {
    if (error && error.message && typeof error.message === 'string') {
      return error.message.includes('Http failure response for');
    }
    return false;
  }
  