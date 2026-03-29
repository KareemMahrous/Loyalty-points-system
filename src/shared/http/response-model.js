export function successResponse({
  data = null,
  message = "Request completed successfully."
} = {}) {
  return {
    success: true,
    message,
    error: "",
    data,
  };
}

export function errorResponse({
  data = null,
  message = "Request failed.",
  error = "Something went wrong",
} = {}) {
  return {
    success: false,
    message,
    error,
    data,
  };
}
