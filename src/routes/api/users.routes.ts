import { Router  ,Request ,Response} from "express";
import * as controller from '../../controllers/users.controllers';

const router = Router()

// router.get('/' , async (req: Request, res: Response)=>{
//     res.json({
//     message: 'Hello World 🌍 from users router',
//     })
// })

router.get('/' , controller.index);
router.post('/' , controller.create);
router.get('/:id' , controller.getOne);

export default router;
