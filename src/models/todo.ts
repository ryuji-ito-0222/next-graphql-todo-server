import mongoose from 'mongoose';

const todoSchema = new mongoose.Schema({
  todo: String,
  isCompleted: Boolean,
});

export default mongoose.model('todo', todoSchema);
