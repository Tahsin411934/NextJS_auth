import clientPromise from "@/db/dbClient";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export async function POST(req) {
    const { id, title } = await req.json(); // Ensure both id and title are extracted

    if (!id || !title) {
        return NextResponse.json({ error: "ID and title are required" }, { status: 400 });
    }

    // Connect to MongoDB
    const client = await clientPromise;
    const db = client.db("nextTest");
    const collection = db.collection("nexttest");

    // Check if the item exists
    const find_id = await collection.findOne({ _id: new ObjectId(id) });

    if (!find_id) {
        return NextResponse.json({ error: "ID not found" }, { status: 404 });
    }

    // Update the item
    await collection.updateOne({ _id: new ObjectId(id) }, {
        $set: {
            title, // Update the title
        }
    });

    // Return the updated item
    const updatedItem = await collection.findOne({ _id: new ObjectId(id) });
    return NextResponse.json(updatedItem);
}
