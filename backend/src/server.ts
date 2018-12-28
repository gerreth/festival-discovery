import app from "./app";

app.set("port", process.env.PORT || 2000);

/**
 * Start Express server.
 */
const server = app.listen(app.get("port"), () => {});

export default server;
