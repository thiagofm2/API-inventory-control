import { Router, Request, Response } from "express";
import multer from "multer";
import uploadConfig from "./config/multer";
import { CreateUserController } from "./controllers/user/CreateUserController";
import { AuthUserController } from "./controllers/user/AuthUserController";
import { isAuthenticated } from "./middlewares/isAuthenticated";
import { DetailUserController } from "./controllers/user/DetailUserController";
import { RemoveUserController } from "./controllers/user/RemoveUserController";
import { CreateCategoryController } from "./controllers/category/CreateCategoryController";
import { EditCategoryController } from "./controllers/category/EditCategoryController";
import { ListCategoryController } from "./controllers/category/ListCategoryController";
import { RemoveCategoryController } from "./controllers/category/DeleteCategoryController";
import { CreateProductController } from "./controllers/product/CreateProductController";
import { EditProductController } from "./controllers/product/EditProductController";
import { FindProductByCategoryController } from "./controllers/product/FindProductByCategoryController";
import { ListAllProductController } from "./controllers/product/ListAllProductController";
import { RemoveProductController } from "./controllers/product/RemoveProductController";
import { SaleProductController } from "./controllers/sale/SaleProductController";

const router = Router();
const upload = multer(uploadConfig.upload("./tmp"));


// User Routes
router.post("/user", new CreateUserController().handle );
router.post("/session", new AuthUserController().handle);
router.get("/me", isAuthenticated, new DetailUserController().handle);
router.delete("/user/remove", new RemoveUserController().handle);


// Category Routes
router.post("/category", isAuthenticated, new CreateCategoryController().handle);
router.get("/category", new ListCategoryController().handle);
router.put("/category/:category_id", isAuthenticated, new EditCategoryController().handle);
router.delete("/category/:category_id", isAuthenticated, new RemoveCategoryController().handle);


// Product Routes
router.post("/product", isAuthenticated, upload.single("banner"), new CreateProductController().handle);
router.put("/product/:product_id", isAuthenticated, upload.single("banner"), new EditProductController().handle);
router.get("/product", isAuthenticated, new FindProductByCategoryController().handle);
router.get("/product/all", isAuthenticated, new ListAllProductController().handle);
router.delete("/product/:product_id", isAuthenticated, new RemoveProductController().handle);


// Sale Routes
router.put("/sale", isAuthenticated, new SaleProductController().handle);

export { router };