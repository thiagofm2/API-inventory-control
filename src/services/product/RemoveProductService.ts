import prismaClient from "../../prisma";

interface RemoveProductInterface {
    product_id: string
}

class RemoveProductService {
    async execute({product_id}: RemoveProductInterface) {
        if(!product_id || product_id === null || product_id === ''){
            throw new Error("The id of product is necessary to delete.");
        };

        const productDeleted = await prismaClient.product.delete({
            where:{
                id: product_id,
            }
        });

        return productDeleted;
    }
}

export { RemoveProductService }