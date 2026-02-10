import { Request, Response } from 'express';
import Document from '../models/documentModel';

//create document
export const createDocument = async (req: Request, res: Response) => {
  const userId = (req as any).userId;

  const doc = await Document.create({
    userId,
    title: 'Untitled',
    content: [],
  });
  res.status(201).json(doc);
};

//get all document
export const getAllDocument = async (req: Request, res: Response) => {
  const userId = (req as any).userId;

  const docs = await Document.find({ userId }).sort({ updatedAt: -1 });
  res.json(docs);
};

//get one document
export const getDocumentById = async (req: Request, res: Response) => {
  const userId = (req as any).userId;
  const { id } = req.params;

  const doc = await Document.findOne({
    _id: id,
    userId,
  });

  if (!doc) {
    return res.status(404).json({ message: 'Document not found' });
  }

  res.json(doc);
};

//updating document
export const updateDocument = async (req: Request, res: Response) => {
  const userId = (req as any).userId;
  const { id } = req.params;
  const { title, content } = req.body;

  const update: any = {};
  if (title !== undefined) update.title = title;
  if (content !== undefined) update.content = content;

  console.log('USER ID:', userId);
  console.log('DOC ID:', id);

  const doc = await Document.findOneAndUpdate({ _id: id, userId }, update, {
    new: true,
  });

  if (!doc) {
    return res.status(404).json({ message: 'Document not found' });
  }
  res.json(doc);
};

//delete document
export const deleteDocument = async (req: Request, res: Response) => {
  const userId = (req as any).userId;
  const { id } = req.params;

  await Document.findOneAndDelete({
    _id: id,
    userId,
  });

  res.json({ message: 'Deleted' });
};
