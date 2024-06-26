import { Schema, model, models } from 'mongoose';

const RecordSchema = new Schema({
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required:[true, 'User is required']
    },
    title: {
        type: String,
        required: [true, 'Title is required!'],
    },
    // 0-4
    difficulty: {
        type: Number,
        required: [true, 'Difficulty is required!'],
    },
    //0-4
    priority: {
        type: Number,
        required: [true, 'Priority is required!'],
    },
    // Solved, Unsolved, Best Solution
    status: {
        type: Number,
        required: [true, 'Status is required!'],
    },
    // 
    attempts: {
        type: [Number],
        required: [true, 'Attempts is required!'],
    },
    dates: {
        type: [String],
        required: [true, 'Dates is required!'],
    },
    notes: {
        type: String,
    },
});

// 添加组合唯一索引
RecordSchema.index({ creator: 1, title: 1 }, { unique: true });

const Record = models.Record || model("Record", RecordSchema);

export default Record;