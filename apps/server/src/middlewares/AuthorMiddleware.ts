import { NextFunction, Request, Response } from "express";
import { IAuthor } from "../interfaces/Author";

export const authorMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const author: IAuthor = {
        name: 'Giovanny',
        lastname: 'Arango Suárez'
    };

    res.locals.author = author;
    next();
};