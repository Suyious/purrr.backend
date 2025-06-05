import { Router } from 'express';
import { AccessToken } from 'livekit-server-sdk';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const router = Router();

router.post('/livekit-token', async (req, res) => {
  const { identity, room } = req.body;

  if (!identity || !room) {
    return res.status(400).json({ error: 'Missing identity or room' });
  }

  console.log('Generating token for identity:', identity, 'in room:', room);


  const token = new AccessToken(
    process.env.LIVEKIT_API_KEY!,
    process.env.LIVEKIT_API_SECRET!,
    {
      identity,
    }
  );

  token.addGrant({ roomJoin: true, room });

  const jwt = await token.toJwt();
  console.log('Generated token:', jwt);
  console.log('Raw token', token);


  return res.json({ token: jwt });
});

export default router;
