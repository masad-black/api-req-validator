import { validateAll } from "./validateAll.js";
import { ApiResponse } from "../apiResponse.js";

function validateRequest(schema) {
  return function (req, res, next) {
    const errors = [];

    if (Object.keys(schema.body).length !== 0) {
      const { validatorErrors, cpSchema } = validateAll(
        req.body,
        schema.body,
        schema.options
      );

      req.body = cpSchema;
      errors.push(...validatorErrors);
    }

    if (Object.keys(schema.query).length !== 0) {
      const { validatorErrors, cpSchema } = validateAll(
        req.query,
        schema.query,
        schema.options
      );
      req.modifiedQuery = cpSchema;
      errors.push(...validatorErrors);
    }

    if (errors.length > 0) {
      return res.send(new ApiResponse(errors, 400));
    }

    // if no error next middleware will be called
    next();
  };
}

export { validateRequest };
