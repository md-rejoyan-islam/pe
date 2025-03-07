import { errorResponse } from "../helper/responseHandler.js";

const errorHandler = (err, _, res) => {
  errorResponse(res, {
    statusCode: err.status,
    message: err.message,
  });
};

export default errorHandler;
