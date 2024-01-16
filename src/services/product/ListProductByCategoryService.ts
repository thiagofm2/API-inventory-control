import prismaClient from "../../prisma";

interface ListProductByCategoryIdRequest {
    category_id: string,
}

class ListProductByCategoryService {
    async execute({ category_id }: ListProductByCategoryIdRequest) {
        const findProduct = await prismaClient.product.findMany({
            where: {
                category_id: category_id
            },
            select:{
                id: true,
                name: true,
                amount: true,
                description: true,
                price: true,
                banner: true,
                category_id: true
            }
        });

        return findProduct;
    }
}

export { ListProductByCategoryService }