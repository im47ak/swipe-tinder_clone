import express from 'express';
import { protectRoute } from '../middleware/auth.js';
import { sendMessage, getConversation, getUnreadCounts } from '../controllers/messageController.js';

const router = express.Router();

router.use(protectRoute);

router.post('/send', sendMessage);
router.get('/conversation/:userId', getConversation);
router.get('/unread-counts', getUnreadCounts);

export default router;