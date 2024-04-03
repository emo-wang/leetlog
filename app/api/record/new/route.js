import Record from "@models/record";
import { connectToDB } from "@utils/database";

export const POST = async (request) => {
    const record = await request.json();

    try {
        await connectToDB();
        const newRecord = new Record({ ...record, creator: record.userId });

        await newRecord.save();
        return new Response(JSON.stringify(newRecord), { status: 201 })
    } catch (error) {
        return new Response("Failed to create a new record", { status: 500 });
    }
}