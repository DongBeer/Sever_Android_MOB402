const express = require("express");
const productController = require("../controllers/productController");
const multer = require("multer");
const upload = multer({ dest: "uploads/" }); //khi up load se them vao thu muc uploads

const router = express.Router();

router.get("/", productController.getList);

router.get("/add", productController.getFormAdd);

// router.post("/add", productController.postFormAdd);
router.post("/add", upload.single("anh_sp"), productController.postFormAdd);

router.get("/edit/:id", productController.getEditForm);

router.post("/edit/:id", upload.single("anh_sp"), productController.postEdit);

router.get("/delete/:id", productController.deleteProduct);

//tim kiem theo ten san pham

router.post("/search1", productController.search);

//API trả về danh sách sản phẩm
router.get("/api/list", productController.getListAPI);

//API tìm kiểm danh sách sản phẩm
router.post("/api/search2", productController.search2);

//Api thêm sản phẩm
router.post("/api/addSP", productController.addSP);
module.exports = router;
