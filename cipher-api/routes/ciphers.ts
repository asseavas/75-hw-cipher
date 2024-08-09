import { Router, Request, Response } from 'express';
import { cipher } from '../vigenereCipher';

const cipherRouter = Router();

cipherRouter.post('/encode', (req: Request, res: Response) => {
  const { password, message } = req.body;

  if (!password || !message) {
    return res.status(400).json({ error: 'Password and message are required' });
  }

  const encodedMessage = cipher(password, message, true);
  return res.json({ encoded: encodedMessage });
});

cipherRouter.post('/decode', (req: Request, res: Response) => {
  const { password, message } = req.body;

  if (!password || !message) {
    return res.status(400).json({ error: 'Password and message are required' });
  }

  const decodedMessage = cipher(password, message, false);
  return res.json({ decoded: decodedMessage });
});

export default cipherRouter;
