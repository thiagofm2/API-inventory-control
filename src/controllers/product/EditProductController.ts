import { Request, Response } from "express";
import { EditProductService } from "../../services/product/EditProductService";
import { EditProductRequest } from "../../models/interfaces/product/EditProductRequest";


class EditProductController {
    async handle(req: Request, res: Response) {
        const { name, price, description, banner, category_id, amount }: EditProductRequest = req.body;
        const product_id = req.params.product_id as string;

        const editProductService = new EditProductService();
        const product = editProductService.execute({name, price, description, banner, product_id, category_id, amount});

        return res.json(product);
    }
}

export { EditProductController }