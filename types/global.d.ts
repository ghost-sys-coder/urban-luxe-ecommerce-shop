import mongoose from "mongoose";

declare global {
    namespace NodeJS {
      interface Global {
        mongoose: {
          conn: typeof mongoose | null;
          promise: Promise<mongoose> | null;
        };
      }
    }
  }
  