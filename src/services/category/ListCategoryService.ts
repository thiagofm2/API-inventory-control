import prismaClient from "../../prisma";

class ListCategoryService { 
    async execute() {
        const categoryList = await prismaClient.category.findMany({
            select: {
                id: true,
                name: true,
            }
        });

        return categoryList;
    }
}

export { ListCategoryService }