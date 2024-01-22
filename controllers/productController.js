const { query } = require("express");
const Item = require("../models/productModel");

const isEmpty = require("lodash/isEmpty"); //su dung ham kiem tra rong

exports.getList = (req, res) => {
  Item.find()
    .then((items) => {
      res.render("products/index", { items, layout: "layouts/main" });
    })
    .catch((err) => {
      console.error("Err:", err);
      res.status(500).send("Internal Server Error");
    });
};

exports.getFormAdd = (req, res) => {
  res.render("products/add", { layout: "layouts/main" });
};

exports.postFormAdd = (req, res) => {
  // const newItem = new Item(req.body);

  const newItem = new Item({
    ten_sp: req.body.ten_sp,
    gia_tien: req.body.gia_tien,
    so_luong: req.body.so_luong,
    anh_sp: req.file.path,
    mo_ta: req.body.mo_ta,
  });
  newItem
    .save()
    .then(() => {
      res.redirect("/");
    })
    .catch((err) => {
      console.error("Err:", err);
      res.status(500).send("Internal Server Error");
    });
};

exports.getEditForm = (req, res) => {
  const itemId = req.params.id;
  Item.findById(itemId)
    .then((item) => {
      res.render("products/edit", { item, layout: "layouts/main" });
    })
    .catch((err) => {
      console.error("Err:", err);
      res.status(500).send("Internal Server Error");
    });
};

// exports.postEdit = (req, res) => {
//   const itemId = req.params.id;
//   Item.findByIdAndUpdate(itemId, req.body)
//     .then(() => {
//       res.redirect("/");
//     })
//     .catch((err) => {
//       console.error("Err:", err);
//       res.status(500).send("Internal Server Error");
//     });
// };

exports.postEdit = (req, res) => {
  const itemId = req.params.id;
  const updateItem = {
    ten_sp: req.body.ten_sp,
    gia_tien: req.body.gia_tien,
    so_luong: req.body.so_luong,
    anh_sp: req.file.path,
    mo_ta: req.body.mo_ta,
  };
  if (req.file) {
    // khi co uploads anh thi moi sua anh
    updateItem.anh_sp = req.file.path;
  }
  Item.findByIdAndUpdate(itemId, updateItem)
    .then(() => {
      res.redirect("/");
    })
    .catch((err) => {
      console.error("Err:", err);
      res.status(500).send("Internal Server Error");
    });
};

exports.deleteProduct = (req, res) => {
  const itemId = req.params.id;
  Item.findByIdAndDelete(itemId)
    .then(() => {
      res.redirect("/");
    })
    .catch((err) => {
      console.error("Err:", err);
      res.status(500).send("Internal Server Error");
    });
};

//hien thi san pham duoc tim kiem
exports.search = (req, res) => {
  if (!isEmpty(req.body.search1)) {
    const query = req.body.search1;
    const regex = new RegExp(query, "i"); // dung de dinh nghia khong phan biet chu hoa chu thuong
    const searchQuery = {
      $or: [{ ten_sp: { $regex: regex } }],
    };

    Item.find(searchQuery)
      .then((items) => {
        res.render("products/index", { items, layout: "layouts/main" });
      })
      .catch((err) => {
        console.error("Err:", err);
        res.status(500).send("Internal Server Error");
      });
  } else {
    Item.find()
      .then((items) => {
        res.render("products/index", { items, layout: "layouts/main" });
      })
      .catch((err) => {
        console.error("Err:", err);
        res.status(500).send("Internal Server Error");
      });
  }
};

// Api get danh sách sản phẩm
exports.getListAPI = (req, res) => {
  Item.find()
    .then((items) => {
      res.json({ items });
    })
    .catch((err) => {
      console.error("Err:", err);
      res.status(500).send("Internal Server Error");
    });
};

// Api search
exports.search2 = (req, res) => {
  if (!isEmpty(req.body.search)) {
    const query = req.body.search;
    const regex = new RegExp(query, "i"); // dung de dinh nghia khong phan biet chu hoa chu thuong
    const searchQuery = {
      $or: [{ ten_sp: { $regex: regex } }],
    };

    Item.find(searchQuery)
      .then((items) => {
        // res.render("products/index", { items, layout: "layouts/main" });
        res.json({ items });
      })
      .catch((err) => {
        console.error("Err:", err);
        res.status(500).send("Internal Server Error");
      });
  } else {
    Item.find()
      .then((items) => {
        // res.render("products/index", { items, layout: "layouts/main" });
        res.json({ items });
      })
      .catch((err) => {
        console.error("Err:", err);
        res.status(500).send("Internal Server Error");
      });
  }
};

exports.addSP = (req, res) => {
  // const newItem = new Item(req.body);

  const newItem = new Item({
    ten_sp: req.body.ten_sp,
    gia_tien: req.body.gia_tien,
    so_luong: req.body.so_luong,
    anh_sp: req.file.path,
    mo_ta: req.body.mo_ta,
  });
  newItem
    .save()
    .then(() => {
      res.redirect("/");
    })
    .catch((err) => {
      console.error("Err:", err);
      res.status(500).send("Internal Server Error");
    });
};
