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
    attempts: {
        type: Number,
        default: 1,
    },
    difficulty: {
        type: Number,
        required: [true, 'Difficulty is required!'],
    },
    priority: {
        type: Number,
        required: [true, 'Priority is required!'],
    },
    status: {
        type: String,
        required: [true, 'Status is required!'],
    },
    dates: {
        type: Number,
        required: [true, 'Dates is required!'],
    },
    notes: {
        type: String,
    },
});

const Record = models.Record || model("Record", RecordSchema);

export default Record;