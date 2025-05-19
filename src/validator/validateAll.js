import validator from "validator";

function validateAll(reqSchema, definedSchema, options) {
  let validatorErrors = [];
  let cpSchema = { ...reqSchema };

  // checking the field that are comming in {reqSchema object}, are  in definedSchema
  for (let [field] of Object.entries(cpSchema)) {
    if (definedSchema[field] === undefined) {
      if (options.strict) {
        delete cpSchema[field];
      }
    }
  }

  for (let [field, rules] of Object.entries(definedSchema)) {
    // checking if feild exist in the req
    if (cpSchema[field] === undefined) {
      // if required is true then error, and  if false  then it's okay
      if (rules.required) {
        validatorErrors.push(`${field} doesn't exist, according to schema`);
        continue;
      } else continue;
    } else {
      // checking types
      if (rules.type && typeof cpSchema[field] !== rules.type) {
        validatorErrors.push(
          `${field} type didn't matched, according to schema`
        );
      }
    }

    // checking specific rules for {string}
    if (typeof cpSchema[field] === "string") {
      // enum
      if (rules.enum) {
        const check = rules.enum.find((value) => value === cpSchema[field]);
        if (check === undefined) {
          validatorErrors.push(
            `${field} doesn't have deifined values, according to schema`
          );
        }
      }

      // triming sides
      if (rules.trim) {
        cpSchema[field] = cpSchema[field].trim();
      }

      // formate
      if (rules.format) {
        // for email
        if (rules.format === "email") {
          if (!validator.isEmail(cpSchema[field])) {
            validatorErrors.push(
              `${field} formate didn't matched, according to schema`
            );
          }
        }
        // for url
        if (rules.format === "url") {
          if (!validator.isURL(cpSchema[field])) {
            validatorErrors.push(
              `${field} formate didn't matched, according to schema`
            );
          }
        }
        // for date
        if (rules.format === "date") {
          if (!validator.isDate(cpSchema[field])) {
            validatorErrors.push(
              `${field} pattren didn't matched, according to schema`
            );
          }
        }
        // for uuid
        if (rules.format === "uuid") {
          if (!validator.isUUID(cpSchema[field])) {
            validatorErrors.push(
              `${field} pattren didn't matched, according to schema`
            );
          }
        }
        // for phone no
        if (rules.format === "phone") {
          if (!validator.isMobilePhone(cpSchema[field])) {
            validatorErrors.push(
              `${field} pattren didn't matched, according to schema`
            );
          }
        }
        // for credit card
        if (rules.format === "credit-card") {
          if (!validator.isCreditCard(cpSchema[field])) {
            validatorErrors.push(
              `${field} pattren didn't matched, according to schema`
            );
          }
        }
      }

      // lower and upper case
      if (rules.lowerCase) {
        cpSchema[field] = cpSchema[field].toLowerCase();
      }
      if (rules.upperCase) {
        cpSchema[field] = cpSchema[field].toUpperCase();
      }

      // regular expressions
      if (rules.pattern) {
        if (!rules.pattern.test(cpSchema[field])) {
          validatorErrors.push(
            `${field} pattren didn't matched, according to schema`
          );
        }
      }

      //  minimum
      if (rules.minLength && cpSchema[field].length < rules.minLength) {
        validatorErrors.push(`${field} is less, according to schema`);
      }
      // maximum
      if (rules.maxLength && cpSchema[field].length > rules.maxLength) {
        validatorErrors.push(`${field} lenght is greater, according to schema`);
      }
    }

    // checking specific rules for {number}
    if (typeof cpSchema[field] === "number") {
      //  minimum
      if (rules.min && cpSchema[field] < rules.min) {
        validatorErrors.push(`${field} lenght is less, according to schema`);
      }
      //  maximun
      if (rules.max && cpSchema[field] > rules.max) {
        validatorErrors.push(`${field} lenght is greater, according to schema`);
      }

      // is integer
      if (rules.integer && !Number.isInteger(cpSchema[field])) {
        validatorErrors.push(`${field} is not integer, according to schema`);
      }
    }

    //type conversion
    if (rules.convert) {
      if (rules.convert === "string") cpSchema[field] = String(cpSchema[field]);
      else if (rules.convert === "number")
        cpSchema[field] = Number(cpSchema[field]);
      else if (rules.convert === "boolean")
        cpSchema[field] = Boolean(cpSchema[field]);
    }
  }

  return { validatorErrors, cpSchema };
}

export { validateAll };
