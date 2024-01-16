import prismaClient from "../../prisma";
import { EditCategoryRequest } from "../../models/interfaces/category/EditCategoryRequest";

class EditCategoryService {
    async execute({ name, category_id }: EditCategoryRequest) {
        if(
            category_id === " " || 
            name === " " || 
            !category_id || 
            !name || 
            category_id === null 
            || name === null
        ){
            throw new Error("Invalid arguments to edit category.");
        };

        const category = await prismaClient.category.update({
            where:{
                id: category_id
            },
            data: {
                name: name
            }
        });

        return category;
    }
}

export { EditCategoryService }