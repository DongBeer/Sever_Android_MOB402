const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  ten_sp: String,
  gia_tien: String,
  so_luong: String,
  mo_ta: String,
  anh_sp: String,
});

const Item = mongoose.model("tb_products", itemSchema);

module.exports = Item;
