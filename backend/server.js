const express= require("express");
const mongoose= require("mongoose");
const dotenv=require("dotenv");
const cors= require("cors");
const bodyParser= require("body-parser");
const http = require("http"); 
const { Server } = require("socket.io");
const app= express();
require("dotenv").config();

const PORT=process.env.PORT||8070;

app.use(cors());
app.use(bodyParser.json());

const URL=process.env.MONGODB_URL;

mongoose.connect(URL,{
   
    useNewUrlParser:true,
    useUnifiedTopology:true,

});

const connection =mongoose.connection;
connection.once("open",()=>{
    console.log("Mongodb connection success!");
})

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://localhost:8070", 
        methods: ["GET", "POST"],
    },
});

io.on("connection", (socket) => {
    console.log("A client connected:", socket.id);

    socket.on("disconnect", () => {
        console.log("A client disconnected:", socket.id);
    });
});

global.io = io;

const product=require("./routes/product_route.js");


app.use("/products",product)

app.listen(PORT,()=>{
    console.log(`Server is up and running on port ${PORT}`)
})