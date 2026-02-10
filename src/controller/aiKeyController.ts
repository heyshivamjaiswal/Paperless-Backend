import { Request, Response } from 'express';
import AIKey from '../models/aiKeyMode';

/**
 * GET AI key for logged-in user
 */
export const getAIKey = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).userId;

    const aiKey = await AIKey.findOne({ userId }).lean();

    if (!aiKey) {
      return res.json({ apiKey: null });
    }

    res.json({ apiKey: aiKey.apiKey });
  } catch (error) {
    console.error('Error fetching AI key:', error);
    res.status(500).json({ message: 'Failed to fetch AI key' });
  }
};

/**
 * POST/UPDATE AI key
 */
export const updateAIKey = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).userId;
    const { apiKey } = req.body;

    const key = await AIKey.findOneAndUpdate(
      { userId },
      { userId, apiKey },
      { upsert: true, new: true }
    );

    res.json({ apiKey: key.apiKey });
  } catch (error) {
    console.error('Error updating AI key:', error);
    res.status(500).json({ message: 'Failed to update AI key' });
  }
};
