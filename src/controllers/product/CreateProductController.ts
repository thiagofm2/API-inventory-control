import { Request, Response } from "express";
import { CreateProductService  } from "../../services/product/CreateProductService";
import { ProductRequest } from "../../models/interfaces/product/ProductRequest";


class CreateProductController {
    async handle(req: Request, res: Response) {
        const { name, price, description, banner, category_id, amount}:ProductRequest = req.body;
        const createProductService = new CreateProductService();

        if(!req.file) {
            throw new Error("Error sending image");
        } else {
            const { originalname, filename: banner } = req.file;
            const product = await createProductService.execute({
                name,
                price,
                description,
                banner,
                category_id,
                amount
            });

            return res.json(product);
        }
    }
}

export { CreateProductController }
