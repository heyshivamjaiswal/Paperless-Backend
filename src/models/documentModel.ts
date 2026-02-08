import mongoose, { model, Schema } from 'mongoose';

interface IDocument {
  userId: mongoose.Types.ObjectId;
  title: string;
  content: any[] | any;
}

const documentSchem = new Schema<IDocument>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },

    title: {
      type: String,
      default: 'Untitled',
    },

    content: {
      type: Array,
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

const Document = model<IDocument>('Document', documentSchem);

export default Document;
