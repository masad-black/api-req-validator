class ApiResponse {
  constructor(error, statusCode = 200) {
    this.error = error;
    this.statusCode = statusCode;
  }
}

export { ApiResponse };
