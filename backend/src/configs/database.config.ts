import { connect } from 'mongoose';

export const dbConnect = () => {
    connect(process.env.MONGO_URI!).then(
        () => console.log("Connected to MongoDB successfully"),
        (error) => console.error("Error connecting to MongoDB:", error)
    );
};






// import {connect,ConnectOptions} from 'mongoose'

// export const dbConnect = () => {
//     connect(process.env.MONGO_URI!,{
//         useNewUrlParser:true,
//         useUnifiedTopology:true
//     } as ConnectOptions).then(
//         () => console.log("connect successfully"),
//         (error) => console.log(error)
//     )
// }