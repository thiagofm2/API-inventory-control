import { RemoveCategoryRequest } from "../../models/interfaces/category/RemoveCategoryRequest";
import prismaClient from "../../prisma";

class RemoveCategoryService {
    async execute({category_id}: RemoveCategoryRequest) {
        if(!category_id || category_id === null || category_id === "") {
            throw new Error("Category id is necessary.");
        }

        const deleteCategory = await prismaClient.category.delete({
            where:{
                id: category_id,
            }
        });

        return deleteCategory;
    }
}

export { RemoveCategoryService }