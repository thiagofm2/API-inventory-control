import { Request, Response } from "express";
import { ListProductByCategoryService } from "../../services/product/ListProductByCategoryService";

class FindProductByCategoryController {
    async handle(req: Request, res: Response) {
        const category_id  = req.query.category_id as string;
        const listProductCategoryService = new ListProductByCategoryService();

        const list = await listProductCategoryService.execute({category_id: category_id});

        return res.json(list);
    }
}

export { FindProductByCategoryController }