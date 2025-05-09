import express, { Request, Response, NextFunction } from "express";
import swaggerUi from "swagger-ui-express";
import swaggerDocs from "./swagger.json";
import 'express-async-errors';
import cors from 'cors';
import { router } from "./routes";
import path from 'path';

const app = express();
app.use(express.json());
app.use(cors());

app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use("/api/restaurant", router);

app.use('/files', express.static(path.resolve(__dirname, '..', 'tmp')));

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    if(err instanceof Error) {
        return res.status(400).json({
            error: err.message
        });
    }

    return res.status(500).json({
        status: 'error',
        message: 'Internal server error'
    });
});

app.listen(3002, () => console.log('SERVER ONLINE :)'));
