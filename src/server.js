import express from "express";
import morgan from "morgan";
import { engine } from "express-handlebars";
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
import flash from "connect-flash";
import session from "express-session";
import mysqlStore from "express-mysql-session";
import passport from "passport";
import { database } from "./keys.js";

//  Initiliazations
export const app = express();
import "./config/passport.js";
import { helpers } from "./helpers/handlebars.js";

//  Setting
app.set("port", process.env.PORT || 4000);
app.set("views", path.join(__dirname, "views"));
app.engine(
  ".hbs",
  engine({
    defaultLayout: "main",
    layoutsDir: path.join(app.get("views"), "layouts"),
    partialsDir: path.join(app.get("views"), "partials"),
    extname: ".hbs",
    helpers: helpers,
  })
);
app.set("view engine", ".hbs");

//  Middlewares
app.use(
  session({
    secret: "muamimysqlnodesession",
    resave: false,
    saveUninitialized: false,
    store: new mysqlStore(database),
  })
);
app.use(flash());
app.use(morgan("dev"));
app.use(
  express.urlencoded({
    extended: false,
  })
);
app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());

//  Global variable
app.use((req, res, next) => {
  app.locals.success = req.flash("success");
  app.locals.message = req.flash("message");
  app.locals.user = req.user;
  next();
});

//  Routes
import indexRoutes from "./routes/index.routes.js";
import authRouter from "./routes/authentication.js";
import linksRouter from "./routes/links.js";
app.use(indexRoutes);
app.use(authRouter);
app.use("/links", linksRouter);

// Public
app.use(express.static(path.join(__dirname, "public")));
