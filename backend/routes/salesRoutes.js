const express = require("express");
const { createSale, getSales, updateSale, deleteSale ,getSaleById} = require("../controllers/salesController");

const router = express.Router();

router.post("/", createSale);
router.get("/", getSales);
router.get("/:id",getSaleById);
router.put("/:id", updateSale);
router.delete("/:id", deleteSale);

module.exports = router;
