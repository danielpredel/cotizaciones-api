const express = require("express");
const path = require("path");
const logger = require("morgan");
const cors = require("cors");
const port = process.env.PORT || 3000;
// const dbConnection = require("./src/configs/db");
// dbConnection();

// const usersRouter = require("./src/routes/user.routes");
// const postRouter = require("./src/routes/post.routes");
// const authRouter = require("./src/routes/auth.routes");

const app = express();

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

// app.use("/users", usersRouter);
// app.use("/posts", postRouter);
// app.use("/auth", authRouter);

app.listen(port, () => {
  if (process.env.ENV && process.env.ENV === "DEV") {
    console.log(`App listening on port ${port}`);
    console.log(`http://localhost:${port}`);
  }
});
 