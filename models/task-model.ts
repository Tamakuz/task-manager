// lib/models/task.js
import mongoose from 'mongoose';

const { Schema } = mongoose;

const TaskSchema = new Schema({
  content: {
    type: String,
    required: true,
  },
},{
  timestamps: true,
});

const Task = mongoose.models.Task || mongoose.model('Task', TaskSchema);

export default Task;
