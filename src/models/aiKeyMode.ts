import mongoose, { Schema, model } from 'mongoose';

export interface IAIKey {
  userId: mongoose.Types.ObjectId;
  apiKey: string;
}

const aiKeySchema = new Schema<IAIKey>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true,
      index: true,
    },

    apiKey: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const AIKey = model<IAIKey>('AIKey', aiKeySchema);
export default AIKey;
