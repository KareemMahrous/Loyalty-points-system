export function successResponse({
  data = null,
  message = "Request completed successfully.",
} = {}) {
  return {
    success: true,
    message,
    data,
  };
}

export function errorResponse({
  message = "Request failed.",
  error = "Something went wrong",
} = {}) {
  return {
    success: false,
    message,
    error,
  };
}
