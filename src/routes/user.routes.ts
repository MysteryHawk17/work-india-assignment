import  { Router } from 'express';

import { userController, userLoginController } from '../controllers/user.controller';


const router = Router();

router.post('/register', userController);
router.post('/login', userLoginController);

export default router;

