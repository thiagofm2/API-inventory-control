import prismaClient from "../../prisma";
import { EditProductRequest } from "../../models/interfaces/product/EditProductRequest";

class EditProductService {
    async execute({name, price, description, banner, product_id, category_id, amount}: EditProductRequest) {
        if(!product_id || product_id === '' || product_id === null) {
            throw new Error("The product_id is necessary to update.");
        };

        const product = prismaClient.product.update({
            where:{
                id: product_id
            }, 
            data: {
                name: name,
                price: price,
                description: description,
                banner: banner,
                category_id: category_id,
                amount: Number(amount)
            }
        });

        return product;
    }
}

export { EditProductService }