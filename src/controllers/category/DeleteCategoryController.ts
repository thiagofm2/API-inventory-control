import { Response, Request } from "express";
import { RemoveCategoryService } from "../../services/category/RemoveCategoryService";

class RemoveCategoryController { 
    async handle(req: Request, res: Response) {
        const category_id = req.params.category_id as string;
        const removeCategoryService = new RemoveCategoryService();

        const removedCategory = removeCategoryService.execute({category_id});
        return res.json(removedCategory);
    };
};

export { RemoveCategoryController }