import {Request, Response} from 'express';
import { ListByCategoryService } from '../../services/product/ListByCategoryService';

class ListByCategorycontroller {
    async handle(req: Request, res: Response) {
        const category_id = req.query.category_id as string;
        const listbyCategory = new ListByCategoryService();
        const products = await listbyCategory.execute({ category_id });

        return res.json(products);
    }
}

export { ListByCategorycontroller };