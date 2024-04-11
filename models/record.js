import { Schema, model, models } from 'mongoose';

const RecordSchema = new Schema({
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    title: {
        type: String,
        // TODO: title和creator的组合键唯一
        // unique: [true, 'Title already exists!'],
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

const Record = models.Record || model("Record", RecordSchema);

export default Record;