import Record from "@models/record";
import { connectToDB } from "@utils/database";

export const GET = async (request, { params }) => {
    try {
        await connectToDB()

        const record = await Record.findById(params.id).populate("creator")
        if (!record) return new Response("Record Not Found", { status: 404 });

        return new Response(JSON.stringify(record), { status: 200 })

    } catch (error) {
        return new Response("Internal Server Error", { status: 500 });
    }
}

export const PATCH = async (request, { params }) => {
    const { title, attempts, difficulty, priority, status, dates, notes } = await request.json();

    try {
        await connectToDB();

        // Find the existing Record by ID
        const existingRecord = await Record.findById(params.id);

        if (!existingRecord) {
            return new Response("Record not found", { status: 404 });
        }

        if (attempts.length === 0 || dates.length === 0) {
            return new Response("Must have at least one history record", { status: 500 });
        }

        // Update the Record with new data
        existingRecord.title = title;
        existingRecord.attempts = attempts;
        existingRecord.difficulty = difficulty;
        existingRecord.priority = priority;
        existingRecord.status = status;
        existingRecord.dates = dates;
        existingRecord.notes = notes;

        await existingRecord.save();

        return new Response("Successfully updated the Records", { status: 200 });
    } catch (error) {
        console.log(error);
        return new Response("Error Updating Record", { status: 500 });
    }
};

export const DELETE = async (request, { params }) => {
    try {
        await connectToDB();

        // Find the Record by ID and remove it
        await Record.findByIdAndDelete(params.id);

        return new Response("Record deleted successfully", { status: 200 });
    } catch (error) {
        return new Response("Error deleting Record", { status: 500 });
    }
};