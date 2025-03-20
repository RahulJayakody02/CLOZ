const router = require("express").Router();

// Import controller
const supplier = require('../controllers/supplier_controller'); 

// Route to add a new supplier
router.post('/add', supplier.addSupplier);

router.get('/',supplier.getSuppliers);

router.get('/:supplierObjectId',supplier.get);

router.get('/supplierprofile/:supplierId',supplier.getSupplier);

module.exports = router;
