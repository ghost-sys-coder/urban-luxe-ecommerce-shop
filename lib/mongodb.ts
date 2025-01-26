/* eslint-disable no-var */
import mongoose from "mongoose";



// global.d.ts
declare global {
    var mongoose: {
      conn: typeof import("mongoose") | null;
      promise: Promise<typeof import("mongoose")> | null;
    };
  }
  

const MONGO_URI = process.env.NEXT_PUBLIC_MONGODB_URI as string

if (!MONGO_URI) {
    throw Error("Please define the MONGODB uri connection string in the .env.local file");
}


/**
 * Global is used to maintained a cached connection across hot reloads in development
 * This prevents connections from being created on every requested in development
 */

let cached = global.mongoose;

if (!cached) {
    cached = global.mongoose = { conn: null, promise: null };
}

async function mongoDBConnect(){
    if (cached.conn) {
        return cached.conn;
    }

    if (!cached.promise) {
        const opts = { bufferCommands: false };

        cached.promise = mongoose.connect(MONGO_URI, opts).then((mongoose) => {
            return mongoose;
        });
    }

    cached.conn = await cached.promise;
    return cached.conn;

}

export default mongoDBConnect;