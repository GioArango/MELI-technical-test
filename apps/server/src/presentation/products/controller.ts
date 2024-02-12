import { Request, Response } from "express";
import { getProductsByQuery } from "./services";

export class ProductController {

    public getProducts = async (req: Request, res: Response) => {
        const product = req.query.q;

        const serviceResponse = await getProductsByQuery(product as string)

        res.status(200).json(serviceResponse)
    }
}