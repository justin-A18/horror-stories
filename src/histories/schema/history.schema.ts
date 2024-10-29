import * as mongoose from 'mongoose';

export const historySchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    plot: { type: String, required: true },
  },
  {
    timestamps: true,
  },
);
