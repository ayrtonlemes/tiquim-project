import express, { Request, Response } from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { v4 as uuidv4 } from "uuid";
import session from "express-session";
import swaggerUi from "swagger-ui-express";
import cors from "cors";
import swaggerFile from "./swagger-output.json";
import router from "./router";
import validateEnv from "./utils/validateEnv";
import setCookieLang from "./middlewares/setLangCookie";
import path from "path";

declare module "express-session" {
  interface SessionData {
    uid: string;
    userTypeId: string;
  }
}

dotenv.config();
validateEnv();

const app = express();
const PORT = process.env.PORT || 3333;

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  }),
);

app.use(cookieParser());
app.use(
  session({
    genid: () => uuidv4(),
    secret: "d0141e8d-99d4-4682-872f-9e1993a169bd",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 24 * 60 * 60 * 1000,
    },
  }),
);
app.use(setCookieLang);
app.use(express.json());
app.use(router);

app.use("/uploads/user", express.static(path.join(__dirname, "uploads", "users")));
app.use("/uploads/campaign", express.static(path.join(__dirname, "uploads", "campaigns")));
app.use("/uploads/avatars", express.static(path.join(__dirname, "uploads", "avatars")));

app.use("/api", swaggerUi.serve, swaggerUi.setup(swaggerFile));
app.listen(PORT, () => {
  console.log(`Express app iniciada na porta ${PORT}.`);
});
