import { Request, Response } from "express";

export class ProductController {

    public getProducts = (req: Request, res: Response) => {
        const product = req.query.q
        console.log(product)
        fetch(`https://api.mercadolibre.com/sites/MLA/search?q=${product}&limit=4`)
            .then(resp => resp.json())
            .then(data => {
                res.status(200).json(data.results);
            })
            .catch(error => {
                console.error('Error al obtener los datos:', error);
                res.status(500).json({ error: 'Error al obtener los datos' });
            });
    }
}