import mongoose, { Schema, model } from 'mongoose';

export interface ITask {
  userId: mongoose.Types.ObjectId;
  title: string;
  description?: string;
  date: Date;
  completed: boolean;
}

const taskSchema = new Schema<ITask>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      default: '',
    },

    date: {
      type: Date,
      required: true,
    },

    completed: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Task = model<ITask>('Task', taskSchema);
export default Task;
