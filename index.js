const dotenv = require("dotenv");
dotenv.config();

require("./init");

const cors = require("cors");
const express = require("express");
const app = express();

const authRoute = require("./routes/auth");
const queryRoute = require("./routes/query");

const isAuthenticated = require("./middlewares/auth");

const corsOptions = {
  origin: "*",
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(cors(corsOptions));
app.use(express.json());

app.use("/user", authRoute);
app.use("/api", isAuthenticated, queryRoute);

app.listen(process.env.PORT || 3001, () => console.log("server is up!"));
