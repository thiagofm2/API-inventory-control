import { hash } from "bcryptjs";
import prismaClient from "../../prisma";
import { UserRequest } from "../../models/interfaces/user/UserRequest";

class CreateUserService {
    // We are creating a constructor, using an Interface with the expected data received to create an User.
    async execute({ name, email, password }: UserRequest) {
        // If we don't receive an E-mail, we will return an Error to the user.
        if(!email){
            throw new Error("Email incorrect.");
        };

        // We are verifying if that E-mail already exists on our Database, if exists, we will return an Error.
        const userAlreadyExists = await prismaClient.user.findFirst({
            where: {
                email: email
            }
        });

        if (userAlreadyExists) {
            throw new Error("Email already exists.")
        };

        // We will start to encrypt the User Password.
        const passwordHash = await hash(password, 8);

        // Finally after all validations we will create the User.
        const user = prismaClient.user.create({
            data: {
                name,
                email,
                password: passwordHash
            },
            select: {
                id: true,
                name: true,
                email: true
            }
        });

        return user
    }
}

export { CreateUserService };