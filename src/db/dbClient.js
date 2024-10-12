// lib/mongodb.js

import { MongoClient } from "mongodb";

const uri = "mongodb+srv://nextTest:l7ps0PUtsRRmcBif@cluster0.2vutuar.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"; // পরিবেশ ভেরিয়েবল থেকে URI নিন
const options = {};

let client;
let clientPromise;


client = new MongoClient(uri, options);
client = new MongoClient(uri, options);
clientPromise = client.connect();


export default clientPromise;
