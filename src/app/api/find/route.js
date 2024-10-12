// pages/api/yourApi.js

import clientPromise from "@/db/dbClient";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const client = await clientPromise; // ক্লায়েন্টে সংযোগ করুন
        const db = client.db("nextTest");
        const collection = db.collection("nexttest");

        // সব আইটেম নিয়ে আসুন
        const items = await collection.find({}).toArray(); // toArray() যোগ করুন

        return NextResponse.json(items);
    } catch (error) {
        console.error("Error fetching data:", error);
        return NextResponse.json({ error: "Data fetching failed." }, { status: 500 });
    }
}
