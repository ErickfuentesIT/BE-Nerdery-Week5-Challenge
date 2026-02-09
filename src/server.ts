import express from "express";
import "reflect-metadata";
import { router } from "./router";

import { httpErrorMiddleware } from "./middlewares/httpError.middleware";

if (!process.env.JWT_SECRET) {
  throw new Error("JWT_SECRET environment variable is not defined");
}

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

router(app);
app.use(httpErrorMiddleware);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
