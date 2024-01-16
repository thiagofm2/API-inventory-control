import prismaClient from "../../prisma";

class ListAllProductService {
    async execute() {
        const productList = await prismaClient.product.findMany({
            select: {
                id: true,
                name: true,
                amount: true,
                description: true,
                price: true,
                banner: true,
                category_id: true
            }
        });

        return productList;
    }
}

export { ListAllProductService }