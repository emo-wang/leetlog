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
    const { Record, tag } = await request.json();

    try {
        await connectToDB();

        // Find the existing Record by ID
        const existingRecord = await Record.findById(params.id);

        if (!existingRecord) {
            return new Response("Record not found", { status: 404 });
        }

        // Update the Record with new data
        existingRecord.Record = Record;
        existingRecord.tag = tag;

        await existingRecord.save();

        return new Response("Successfully updated the Records", { status: 200 });
    } catch (error) {
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