import { validateBody } from "./validateBody.js";
import { validateParam } from "./validateParam.js";
import { ApiResponse } from "../apiResponse.js";

function validateRequest(schema) {
  return function (req, res, next) {
    // this will only validate body object
    const bodyErrors = validateBody(req.body, schema.body);

    // const paramsErrors = validateParam(req.param, schema.param)

    if (bodyErrors.length > 0) {
      return res.send(new ApiResponse(bodyErrors, 400));
    }

    // if no error next middleware will be called
    next();
  };
}

export { validateRequest };
