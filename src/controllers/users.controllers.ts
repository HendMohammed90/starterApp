import { Request, Response, NextFunction } from 'express'
import UsersClass from '../models/userModel';
import jwt from 'jsonwebtoken'
import config from '../config'


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
    _req: Request,
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

export const auth = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { first_name, password } = req.body
        // console.log(req.body);
        const user = await userModel.authenticate(first_name, password)
        const token = jwt.sign({ user }, config.token as unknown as string)
        if (!user) {
            return res.status(401).json({
                status: 'error',
                message: 'the first_name and password do not match please try again',
            })
        }
        return res.json({
            status: 'success',
            data: { ...user, token },
            message: 'user authenticated successfully',
        })
    } catch (err) {
        return next(err)
    }
}

