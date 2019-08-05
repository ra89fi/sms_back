const express = require("express");
const app = express();

const authRoute = require("./routes/auth");
const queryRoute = require("./routes/query");

app.use("/user", authRoute);
app.use("/api", queryRoute);

app.listen(process.env.PORT || 3001, () => console.log("server is up!"));
