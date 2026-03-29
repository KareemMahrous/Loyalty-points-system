export function successResponse({ data = null } = {}) {
  return {
    success: true,
    error: "",
    data,
  };
}

export function errorResponse({
  data = null,
  error = "Something went wrong",
} = {}) {
  return {
    success: false,
    error,
    data,
  };
}
