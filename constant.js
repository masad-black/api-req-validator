const createUserSchema = {
  body: {
    username: {
      type: "string",
      required: true,
      minLength: 5,
      maxLength: 10,
      lowerCase: true,
      trim: true,
    },
    email: { type: "string", required: true, format: "email" },
    age: { type: "number", min: 18, max: 25, integer: true },
    password: { type: "string", required: true, trim: true, minLength: 8 },
    isActive: { type: "boolean" },
    images: { type: "array", minItems: 1, maxItems: 5, unique: true },
    role: {
      required: true,
      type: "string",
      enum: ["admin", "customer", "vendor"],
    },
  },
};

export { createUserSchema };
