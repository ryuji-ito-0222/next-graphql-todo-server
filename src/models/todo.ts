import mongoose from 'mongoose';

const todoSchema = new mongoose.Schema({
  todo: String,
  isCompleted: Boolean,
  created_at: String,
});

export default mongoose.model('todo', todoSchema);
