import express, { Request, Response, NextFunction } from "express";
import "express-async-errors";
import swaggerUI from "swagger-ui-express";
import swaggerDocument from '../swagger.json';
import cors from "cors";
import path from "path";
import { router } from './routes';

const app = express();
const port = 9999;

app.use(express.json());
app.use(cors());
app.use('/v1', router);
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));
app.use('/files', express.static(path.resolve(__dirname, "..", "tmp")));

app.use((err: Error, request: Request, response: Response, next: NextFunction) => {
    if(err instanceof Error){
        return response.status(400).json({
            error: err.message,
        })
    }

    return response.status(500).json({
        status: 'error',
        message: 'Internal server error.'
    })
})

app.get("/terms", (req: Request, res: Response) => {
    return res.json({
        message: "Termos de serviço"
    })
})

app.listen(port)