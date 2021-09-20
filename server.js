const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const users = require("./routes/api/users");
const posts = require("./routes/api/posts");
const profile = require("./routes/api/profile");
const passport = require("passport");
const cors = require("cors");
const path = require("path");
const app = express();
// Body parser middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// DB config
const db = require("./config/keys_dev").mongoURI;
// connet to mongodb
mongoose
  .connect(db, {
    useFindAndModify: false,
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => console.log("mongodb connected"))
  .catch((err) => console.log(err));

// Passport middleware
app.use(express.json());
app.use(passport.initialize());
const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    createProxyMiddleware(["/api/users", , "/api/profile", "/api/posts"], {
      target: "http://localhost:5000",
    })
  );
};

// Passport Config
require("./config/passport")(passport);
// User Routes
app.use("/api/users", users);
app.use("/api/profile", profile);
app.use("/api/posts", posts);

// Serve static assets if in isProduction
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Sever listening on port ${port}`));
// git push heroku master
