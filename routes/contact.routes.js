import express from 'express'
import { contact,updatecontact } from '../controllers/contact.controller.js';

const router =express.Router();
router.post("/",contact);
router.post("/update-contact",updatecontact);
export default router;