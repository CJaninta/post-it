const express = require("express");
const controller = require("../controllers");

const router = express.Router();

router.get("/getPost", controller.getPost);

router.post("/createPost", controller.createPost);

router.put("/updatePost/:id", controller.updatePost);

router.delete("/deletePost/:id", controller.deletePost);

module.exports = router;
