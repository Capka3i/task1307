class ErrorHeader extends Error {
  constructor(someError) {
    super(someError.message);
    this.message = someError.message;
    this.status = someError.status;
    this.code = someError.code;

    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = ErrorHeader;
