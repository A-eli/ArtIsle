import express from "express";
import formidable from "express-formidable";
const router = express.Router();

//controllers
import { 
    addProduct,
    updateProductDetails, 
    removeProduct,
    fetchProducts, 
    fetchProductById,
    fetchAllProducts, 
    addProductReview, 
    fetchTopProducts, 
    fetchNewProducts } from "../controllers/productController.js";
import { authenticate } from "../middlewares/authMiddleware.js";
import checkId from "../middlewares/checkId.js";

router.route('/').get(fetchProducts).post(authenticate, formidable(), addProduct);

router.route("/allProducts").get(fetchAllProducts);
router.route("/:id/reviews").post(authenticate, checkId, addProductReview);
router.get("/top", fetchTopProducts);
router.get("/new", fetchNewProducts);

router.route('/:id')
.get(fetchProductById)
.put(authenticate, formidable(), updateProductDetails)
.delete(authenticate, removeProduct);

export default router;