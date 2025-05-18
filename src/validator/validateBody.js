import validator from "validator";

function validateBody(reqSchema, bodySchema) {
  let bodyErrors = [];

  for (let [field, rules] of Object.entries(bodySchema)) {
    // checking if feild exist in the req
    if (reqSchema[field] === undefined) {
      // if required is true then error, and  if false  then it's okay
      if (rules.required) {
        bodyErrors.push(`${field} doesn't exist, according to schema`);
        continue;
      } else continue;
    } else {
      // checking types
      if (rules.type && typeof reqSchema[field] !== rules.type) {
        bodyErrors.push(`${field} type didn't matched, according to schema`);
      }
    }

    // checking specific rules for {string}
    if (typeof reqSchema[field] === "string") {
      // enum
      if (rules.enum) {
        const check = rules.enum.find((value) => value === reqSchema[field]);
        if (check === undefined) {
          bodyErrors.push(
            `${field} doesn't have deifined values, according to schema`
          );
        }
      }

      // triming sides
      if (rules.trim) {
        reqSchema[field] = reqSchema[field].trim();
      }

      // formate
      if (rules.format) {
        // for email
        if (rules.format === "email") {
          if (!validator.isEmail(reqSchema[field])) {
            bodyErrors.push(
              `${field} formate didn't matched, according to schema`
            );
          }
        }
        // for url
        if (rules.format === "url") {
          if (!validator.isURL(reqSchema[field])) {
            bodyErrors.push(
              `${field} formate didn't matched, according to schema`
            );
          }
        }
        // for date
        if (rules.format === "date") {
          if (!validator.isDate(reqSchema[field])) {
            bodyErrors.push(
              `${field} pattren didn't matched, according to schema`
            );
          }
        }
        // for uuid
        if (rules.format === "uuid") {
          if (!validator.isUUID(reqSchema[field])) {
            bodyErrors.push(
              `${field} pattren didn't matched, according to schema`
            );
          }
        }
        // for phone no
        if (rules.format === "phone") {
          if (!validator.isMobilePhone(reqSchema[field])) {
            bodyErrors.push(
              `${field} pattren didn't matched, according to schema`
            );
          }
        }
        // for credit card
        if (rules.format === "credit-card") {
          if (!validator.isCreditCard(reqSchema[field])) {
            bodyErrors.push(
              `${field} pattren didn't matched, according to schema`
            );
          }
        }
      }

      // lower and upper case
      if (rules.lowerCase) {
        reqSchema[field] = reqSchema[field].toLowerCase();
      }
      if (rules.upperCase) {
        reqSchema[field] = reqSchema[field].toUpperCase();
      }

      // regular expressions
      if (rules.pattern) {
        if (!rules.pattern.test(reqSchema[field])) {
          bodyErrors.push(
            `${field} pattren didn't matched, according to schema`
          );
        }
      }

      //  minimum
      if (rules.minLength && reqSchema[field].length < rules.minLength) {
        bodyErrors.push(`${field} is less, according to schema`);
      }
      // maximum
      if (rules.maxLength && reqSchema[field].length > rules.maxLength) {
        bodyErrors.push(`${field} lenght is greater, according to schema`);
      }
    }

    // checking specific rules for {number}
    if (typeof reqSchema[field] === "number") {
      //  minimum
      if (rules.min && reqSchema[field] < rules.min) {
        bodyErrors.push(`${field} lenght is less, according to schema`);
      }
      //  maximun
      if (rules.max && reqSchema[field] > rules.max) {
        bodyErrors.push(`${field} lenght is greater, according to schema`);
      }

      // is integer
      if (rules.integer && !Number.isInteger(reqSchema[field])) {
        bodyErrors.push(`${field} is not integer, according to schema`);
      }
    }
  }

  return bodyErrors;
}

export { validateBody };
