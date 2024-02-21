const NOT_FOUND = "NOT_FOUND"; 
const VALIDATION_FAILED = "VALIDATION_FAILED";
const UNAUTHORIZED = "UNAUTHORIZED";
const FORBIDDEN = "FORBIDDEN";

/**
 * Used to handle 4xx client errors, the handleErrors function in installMiddlewares
 * will map the above codes to their respective http status code.
 * 
 * This error is not intended to be thrown directly, use the static methods instead.
 *
 * Example: 
 *      throw ServiceError.notFound("message")
 *
 *  @class {ServiceError}
 */
class ServiceError extends Error {
    /**
     * Should idealy be called only by the static methods.
     *
     * @param {string} code - One of the above declared constants.
     * @param {string} message - The message that will be sent to the client.
     * @param {string} details - Details about the request.
    */
    constructor(code, message, details = {}) {
        super(message);
        this.code = code;
        this.details = details;
        this.name = "ServiceError";
    }

    static notFound(message, details) {
        return new ServiceError(NOT_FOUND, message, details);
    }

    static validationFailed(message, details) {
        return new ServiceError(VALIDATION_FAILED, message, details);
    }

    static unauthorized(message, details) {
        return new ServiceError(UNAUTHORIZED, message, details);
    }

    static forbidden(message, details) {
        return new ServiceError(FORBIDDEN, message, details);
    }

    get isNotFound() {
        return this.code === NOT_FOUND;
    }

    get isValidationFailed() {
        return this.code === VALIDATION_FAILED;
    }

    get isUnauthorized() {
        return this.code === UNAUTHORIZED;
    }

    get isForbidden() {
        return this.code === FORBIDDEN;
    }
}

module.exports = ServiceError;
