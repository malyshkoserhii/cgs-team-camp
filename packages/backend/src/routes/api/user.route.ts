import { Router } from 'express';
import { jwtAuth } from '@/middlewares/auth.middleware';
import {
	ctrGetCurrentUser,
	ctrUpdateUser,
} from '@/controllers/user.controller';

const router: Router = Router();

router.get('/current', jwtAuth, ctrGetCurrentUser);
router.post('/update', jwtAuth, ctrUpdateUser);

export default router;
