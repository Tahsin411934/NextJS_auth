import clientPromise from "@/db/dbClient";
import { NextResponse } from "next/server";

export async function POST(req) {
    // ডেটা JSON আকারে পড়ুন
    const body = await req.json();  
    console.log(body);

    // MongoDB ক্লায়েন্টে সংযোগ করুন
    const client = await clientPromise;
    const db = client.db("nextTest");
    const collection = db.collection("nexttest");

    // ডেটা ইনসার্ট করুন
    let inserted_item = await collection.insertOne(body);
    
    // ইনসার্ট করা আইটেমটি খুঁজে বের করুন
    const find_id = await collection.findOne({
        _id: inserted_item.insertedId // সঠিকভাবে আইডি ব্যবহার করুন
    });

    return NextResponse.json(find_id);
}
