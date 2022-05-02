const helpers = require("../helpers/helpers");
const express = require('express');
const router = express.Router();
const cors = require('cors');

const corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200
};

router.use(cors(corsOptions));

const product_controller = require('../controllers/product.controller.js');

router.get('/health-check', product_controller.health_check);
router.get('/', helpers.check_token, product_controller.get_products);
router.get('/:id', helpers.check_token, product_controller.products_details);

router.post('/add-products', helpers.check_token, product_controller.add_products);
router.patch('/:id/update-products', helpers.check_token, product_controller.update_products);
router.delete('/delete-products', helpers.check_token, product_controller.delete_products);


module.exports = router;
