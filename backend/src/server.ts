import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv'
dotenv.config();
import userRouter from './router/user.router'
import orderRouter from './router/order.router'
import foodRouter from './router/food.router'
import { dbConnect } from './configs/database.config';
dbConnect();

const app = express();

app.use(express.json());
app.use(cors({
    //credentials:true,
    origin:["http://localhost:4200"]
}))


app.use("/api/foods",foodRouter);
app.use("/api/users",userRouter);
app.use("/api/orders",orderRouter);


// app.use(function (req, res, next) {

//     // Website you wish to allow to connect
//     res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');

//     // Request methods you wish to allow
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

//     // Request headers you wish to allow
//     res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

//     // Set to true if you need the website to include cookies in the requests sent
//     // to the API (e.g. in case you use sessions)
//     //res.setHeader('Access-Control-Allow-Credentials', true);

//     // Pass to next layer of middleware
//     next();
// });





const port = 5000;
app.listen(port, () => {
    console.log("Website served on http://localhost:" +port)
})