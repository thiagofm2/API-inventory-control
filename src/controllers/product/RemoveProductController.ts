import { Request, Response } from "express";
import { RemoveProductService } from "../../services/product/RemoveProductService";

class RemoveProductController {
    async handle(req: Request, res: Response) {
        const product_id = req.params.product_id as string;
        const removeProductService = new RemoveProductService();

        const productDeleted = removeProductService.execute({product_id});

        return res.json({response: "Product has been deleted.", detail: productDeleted})
    }
}

export { RemoveProductController }