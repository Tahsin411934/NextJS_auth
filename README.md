# Next.js এবং MongoDB ব্যবহার করে ডেটা POST, GET, DELETE এবং PUT

এই প্রকল্পটি Next.js এবং MongoDB ব্যবহার করে একটি সাধারণ API তৈরি করার প্রক্রিয়া দেখায়। এখানে আমরা ডেটা তৈরি (POST), পড়া (GET), আপডেট (PUT) এবং মুছতে (DELETE) পারি।

## প্রয়োজনীয়তা

- Node.js এবং npm ইনস্টল করা থাকতে হবে।
- MongoDB অ্যাকাউন্ট এবং URI।

## শুরু করা

### ১. নতুন Next.js অ্যাপ তৈরি করুন

নতুন Next.js অ্যাপ তৈরি করতে, নিচের কমান্ডগুলি ব্যবহার করুন:

```bash
npx create-next-app my-app
cd my-app

### MongoDB সংযোগ স্থাপন  


MongoDB এর জন্য mongodb প্যাকেজ ইনস্টল করুন:

            npm install mongodb
### MongoDB ক্লায়েন্ট তৈরি করুন
lib/mongodb.js নামে একটি ফাইল তৈরি করুন এবং নিচের কোড যোগ করুন:


                    import { MongoClient } from 'mongodb';

                    const uri = "YOUR_MONGODB_URI"; // আপনার MongoDB URI দিন
                    const options = {};

                    let client;
                    let clientPromise;

                    if (process.env.NODE_ENV === 'development') {
                        if (!global._mongoClientPromise) {
                            client = new MongoClient(uri, options);
                            global._mongoClientPromise = client.connect();
                        }
                        clientPromise = global._mongoClientPromise;
                    } else {
                        client = new MongoClient(uri, options);
                        clientPromise = client.connect();
                    }

                    export default clientPromise;
### API রাউট তৈরি করা
app/api/items/route.js ফাইল তৈরি করুন এবং নিচের কোড যোগ করুন:

POST (ডেটা তৈরি)

                    import clientPromise from "@/lib/mongodb";
                    import { NextResponse } from "next/server";

                    export async function POST(req) {
                        const { title } = await req.json();
                        
                        const client = await clientPromise;
                        const db = client.db("your_db_name");
                        const collection = db.collection("items");

                        const result = await collection.insertOne({ title });

                        return NextResponse.json(result);
                    }
GET (ডেটা পড়া)

                    export async function GET(req) {
                        const client = await clientPromise;
                        const db = client.db("your_db_name");
                        const collection = db.collection("items");

                        const items = await collection.find({}).toArray();

                        return NextResponse.json(items);
                    }
PUT (ডেটা আপডেট)

                    import { ObjectId } from "mongodb";

                    export async function PUT(req) {
                        const { id, title } = await req.json();
                        
                        const client = await clientPromise;
                        const db = client.db("your_db_name");
                        const collection = db.collection("items");

                        await collection.updateOne({ _id: new ObjectId(id) }, { $set: { title } });

                        return NextResponse.json({ message: "Item updated successfully" });
                    }
DELETE (ডেটা মুছতে)

                    export async function DELETE(req) {
                        const { id } = await req.json();
                        
                        const client = await clientPromise;
                        const db = client.db("your_db_name");
                        const collection = db.collection("items");

                        await collection.deleteOne({ _id: new ObjectId(id) });

                        return NextResponse.json({ message: "Item deleted successfully" });
                    }

 ## API পরীক্ষা করা
আপনি Thunder Client বা Postman ব্যবহার করে API পরীক্ষা করতে পারেন।

POST রিকুয়েস্ট
                URL: http://localhost:3000/api/items
                Method: POST
                Body:
                json
                Copy code
                {
                    "title": "New Item"
                }
GET রিকুয়েস্ট
                URL: http://localhost:3000/api/items
                Method: GET
PUT রিকুয়েস্ট
                URL: http://localhost:3000/api/items
                Method: PUT
                Body:
                json
                Copy code
                {
                    "id": "YOUR_ITEM_ID",
                    "title": "Updated Item"
                }
DELETE রিকুয়েস্ট
                URL: http://localhost:3000/api/items
                Method: DELETE
                Body:
                json
                Copy code
                {
                    "id": "YOUR_ITEM_ID"
                }
উপসংহার
এখন আপনি সফলভাবে Next.js এবং MongoDB ব্যবহার করে ডেটা POST, GET, PUT এবং DELETE করতে পারবেন। যদি আপনার কোনো প্রশ্ন থাকে বা সাহায্য প্রয়োজন, তাহলে জানাতে দ্বিধা করবেন না।

Happy coding!

You can copy this entire content into your `README.md` file directly!