import mongoose from "mongoose";
const Schema = mongoose.Schema;

const TaskSchema = new Schema({
    title: { type: String, required: true },
    area: { type: String, required: true },
    lastDone: { type: Date, default: Date.now, required: true },
    interval: { type: Number, required: true },
    selected: { type: Boolean, default: true, required: true },
  });
  
// Export model
export default mongoose.model(
  "Task",
  TaskSchema);