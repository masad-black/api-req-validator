// import express from "express";
// import { validateRequest } from "./src/validator/validator.js";
// import { createSchema } from "./src/schema.js";

// const app = express();

// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());

// const bodySchema = {
//   name: { required: true, type: "string", trim: true },
//   age: { type: "number", requied: true, integer: true },
//   email: { requied: true, type: "string", format: "email" },
//   url: { requied: true, type: "string", format: "url" },
//   phoneNo: { requied: true, type: "string", format: "phone" },
//   creditCard: { requied: true, type: "string", format: "credit-card" },
//   slug: { type: "string", upperCase: true },
// };

// const querySchema = {
//   pages: { required: true, convert: "number" },
//   slug: { required: true, convert: "string" },
//   check: { required: true, convert: "boolean" },
// };

// const schema = createSchema({ body: bodySchema, query: querySchema });

// app.post("/data/:id/:name", validateRequest(schema), (req, res) => {
//   res.json(req.modifiedQuery);
// });

// app.listen(8000, () => {
//   console.log("server listning on port 8000!!");
// });
