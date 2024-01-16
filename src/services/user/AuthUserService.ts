import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import prismaClient from "../../prisma";
import { AuthRequest } from "../../models/interfaces/user/auth/AuthRequest";

class AuthUserService {
    async execute({email, password}: AuthRequest){
        // We will verify if exist the email used on our Database.
        if(!email){
            throw new Error("Email is necessary.")
        }
        
        if(!password){
            throw new Error("Password is necessary.")
        }

        const user = await prismaClient.user.findFirst({
            where: {
                email: email
            }
        });

        if(!user){
            throw new Error("Wrong username or password.")
        }

        // After verify if User really exists, we need to verify if the password used is really the same when User register on our application
        const passwordMatch = await compare(password, user?.password);

        if(!passwordMatch){
            throw new Error("Wrong password.");
        }

        const token = sign(
            {
                name: user?.name,
                email: user?.email
            },
            process.env.JWT_SECRET as string,
            {
                subject: user?.id,
                expiresIn: "30d"
            }
        );

        return {
            id: user?.id,
            name: user?.id,
            email: user?.email,
            token: token
        }
    }
}

export { AuthUserService }