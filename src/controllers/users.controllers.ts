import { Request, Response, NextFunction } from 'express'
import UsersClass from '../models/user';

const userModel = new UsersClass()

export const create = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    // console.log(req.body);
    try {
        const user = await userModel.create(req.body)
        res.json({
            status: 'success',
            data: { ...user },
            message: `User ${req.body.first_name} created successfully in the database`,
        })
    } catch (err) {
        next(err)
    }
}


export const index = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const query = await userModel.index();
        res.json({
            status: "Success",
            data: { ...query },
            message: " Get All Of Our Users Successfully",
        });
    } catch (err) {
        next(err)

    }
}


export const getOne = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const user = await userModel.show(req.params.id as unknown as string)
        res.json({
            status: 'success',
            data: user,
            message: 'User retrieved successfully',
        })
    } catch (err) {
        next(err)
    }
}

