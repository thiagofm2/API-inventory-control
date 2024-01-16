import { Request, Response } from "express";
import { SaleProductService } from "../../services/sale/SaleProductService";
import { SaleProductRequest } from "../../models/interfaces/sale/SaleProductRequest";

class SaleProductController {
    async handle( req: Request, res: Response) {
        console.log(req.body)
        const { product_id, amount }: SaleProductRequest = req.body;
        const saleProductService = new SaleProductService();

        const saleProduct = await saleProductService.execute({
            product_id,
            amount
        });

        return res.json(saleProduct);
    }
}

export { SaleProductController }