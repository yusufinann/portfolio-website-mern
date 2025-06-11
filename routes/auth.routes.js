import express from 'express';
import { loginUser, logoutUser, checkAuth } from '../controllers/auth.controller.js'; // .js uzantısı
import { authenticateUser } from '../middleware/authenticateUser.js'; // .js uzantısı

const router = express.Router();

router.post('/login', loginUser);
router.post('/logout', logoutUser);
router.get('/check-auth', authenticateUser, checkAuth);

export default router;