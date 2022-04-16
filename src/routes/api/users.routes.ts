import { Router  ,Request ,Response} from "express";
import * as controller from '../../controllers/users.controllers';
import protectMiddleware from "../../middleware/auth.middleware";

const router = Router()

// router.get('/' , async (req: Request, res: Response)=>{
//     res.json({
//     message: 'Hello World 🌍 from users router',
//     })
// })

router.get('/'  , protectMiddleware, controller.index);
router.post('/' , controller.create);
router.get('/:id' ,protectMiddleware, controller.getOne);
router.post('/authenticate',controller.auth);
// router.post('/authenticate' ,async (req: Request, res: Response)=>{
//         res.json({
//         message: 'Hello World 🌍 from users auth router',
//         })
//     });


export default router;
