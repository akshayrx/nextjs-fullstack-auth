import mongoose from "mongoose";

export async function connect(){
    try {
        //exclamation mark removes the type error, as mongo_url is not defined here as anything
        mongoose.connect(process.env.MONGO_URI!);
        const connection = mongoose.connection;

        connection.on('connected', () => {
            console.log("mongodb connected successfully");
        })
        connection.on('error', (err) => {
            console.log("mongodb connection error, make sure its running" + err);
            process.exit();
        })

    } catch (error) {
        console.log("something goes wrong");
        console.log(error);
    }
}