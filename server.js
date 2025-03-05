import express from 'express';
import cors from 'cors';
import { connectDB } from './config/db.js';
import foodRouter from './routes/foodRoute.js';



//app config
const app = express();
const port = process.env.PORT || 9000;

//middleware
app.use(express.json());
app.use(cors());

//DB config
connectDB();

//api routes end point
app.use('/api/food', foodRouter);
app.use('/images', express.static('uploads'))

app.get('/',(req, res)=>{  //the order of req and res is important
    res.send('hello world');
})
app.listen(port, ()=>{
    console.log(`listening on localhost:${port}`);
});
// UxmK1WQSlvOZrkjV
// mongodb+srv://fetihul:<db_password>@cluster0.k3vs2.mongodb.net/?

// retryWrites=true&w=majority&appName=Cluster0