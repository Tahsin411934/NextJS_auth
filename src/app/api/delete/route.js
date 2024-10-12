import clientPromise from "@/db/dbClient";
import { NextResponse } from "next/server";
import { ObjectId } from "mongodb"; // ObjectId ইম্পোর্ট করুন

export async function DELETE(req) {
    try {
        const { searchParams } = new URL(req.url);
        const id = searchParams.get("id");

        if (!id) {
            return NextResponse.json({ error: "ID is required" }, { status: 400 });
        }

        const client = await clientPromise;
        const db = client.db("nextTest");
        const collection = db.collection("nexttest");

        const result = await collection.deleteOne({ _id: new ObjectId(id) });

        if (result.deletedCount === 0) {
            return NextResponse.json({ error: "Item not found" }, { status: 404 });
        }

        return NextResponse.json({ message: "Item deleted successfully" });
    } catch (error) {
        console.error("Error deleting item:", error);
        return NextResponse.json({ error: "Data deletion failed." }, { status: 500 });
    }
}
