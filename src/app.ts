import app from "./config/app";
import routes from "./config/routes";
import middleware from "./config/middleware";

app.use(middleware);
app.use("/", routes);

export default app;
