const express = require("express");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const userRoute = require("./routes/userRoute");
const customerRoute = require("./routes/customerRoute");

const app = express();
dotenv.config();

app.use(cookieParser(process.env.COOKIE_SECRET_KEY));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//routes
app.use("/api/v1/user", userRoute);
app.use("/api/v1/customer", customerRoute);

app.listen(process.env.PORT, () => {
  console.log(`listening at port ${process.env.PORT}`);
});
