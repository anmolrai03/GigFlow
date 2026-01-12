import mongoose from "mongoose";

const dbName = 'GigFlow';

const connectDb = async ()=>{

  try {
    const connInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${dbName}`);

    console.log(`MongodDB connected to ${connInstance.connection.host}`)
  } catch (error) {
    console.error(`MongoDB connection error ${error.message}`)
    process.exit(1);
  }
}


export default connectDb;