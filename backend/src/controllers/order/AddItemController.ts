import { Request, Response } from "express";
import { AddItemservice } from "../../services/order/AddItemservice";

class AddItemController {
    async handle(req: Request, res: Response) {
        const { order_id, product_id, amount } = req.body;
        const addItemservice = new AddItemservice();
        const order = await addItemservice.execute({ order_id, product_id, amount });

        return res.json(order);
    }
};

export { AddItemController };
