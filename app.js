// npm i lodash
// npm i path
// npm i multer

const express = require("express");
const mongoose = require("mongoose");
const productRoutes = require("./routes/web");
const app = express();

const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const url = "mongodb://0.0.0.0:27017";
const url1 = "mongodb://localhost:27017";
const dbName = "db_test";

mongoose
  .connect(`${url}/${dbName}`)
  .then(() => {
    console.log("ket moi thanh cong");
    app.listen(9999, () => {
      console.log("Server cua ban dang chay duoi cong 9999");
    });
  })
  .catch((err) => {
    console.error("loi ket noi den MongoDB: ", err);
  });

app.use(express.urlencoded({ extended: true }));
app.set("view engine", "hbs");
app.use("/uploads", express.static("uploads"));
app.use("/", productRoutes);
