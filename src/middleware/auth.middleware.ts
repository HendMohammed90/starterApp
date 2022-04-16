import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import config from '../config'
import Error from '../interfaces/error_interface'


const protectMiddleware = (
    req: Request,
    _res: Response,
    next: NextFunction
)=>{

    //get the headers
    // console.log(req);
    const headerAuth = req.get('authorization');

    // console.log(headerAuth);
    
    let token 

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        token = req.headers.authorization.split(' ')[1];
        // console.log('token is : ',token)
    } else if (req.cookies.token){
        token = req.cookies.token
        // console.log('token is : ',token)
    }

    if(!token){
        // return next(new ErrorResponse(`Not Authorized to be here in this route ^_- that`, 401));
        // return next(Error( `Could not login: -_-`)) 
            handlingAutError(next)
    }

    //Verifying the token
    try {
        const verifiedToken = jwt.verify(token ,config.token as unknown as string);
        console.log(verifiedToken);
        if(verifiedToken){
            next()
        }else{
        handlingAutError(next);
        }
    } catch (error) {
        handlingAutError(next);
        // return new Error('Not Authorized to be here in this route ^_-' );
    }

}

//here we handle the error shape to did't tell the user what happened 
const handlingAutError = (next : NextFunction)=>{
    const error:Error  = new Error('Not Authorized to be here in this route ^_-' );
    error.status = 401;
    next(error);
}

export default protectMiddleware;