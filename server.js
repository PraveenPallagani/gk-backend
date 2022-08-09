const express = require('express');
const mongoose = require('mongoose');
const Goal = require('./models/Goal');


const app = express();
app.use(express.json());


const mongooseConnection = () => {
    const uri = "mongodb+srv://root:root01@goals.ypytlu8.mongodb.net/goals?retryWrites=true&w=majority";
    mongoose.connect(uri).then(res=>{
        console.log("Connected To DB");
    }).catch(err=>{
        process.exit();
    });
}

app.get("/", (req, res) => {
    res.send("server is up and running");
});

app.post("/create",async(req, res) => {
    try{
        const {goal,motivation,secretKey,keeper} = req.body;
        if(secretKey==="timeiseverything") { 
            const newGoal = await Goal.create({
                goal,
                motivation,
                keeper
            });
            return res.json({isOkay:true,info:newGoal})
        } else {
            return res.json({isOkay:false,info:"Incorrect Secret Key"});
        }
        
    } catch(err) {
        return res.json({isOkay:false,info:err.message});
    }
});


app.get("/get",async (req,res)=>{
    try{
        const goals = await Goal.find({});
        console.log(goals);
        return res.json({isOkay:true,info:goals});
    } catch(err) {
        return res.json({isOkay:false,info:err.message});
    }
});

app.post('/completed',async (req,res)=>{
    try {
        const {id} = req.body;
        const TRUE = true;
        const info = await Goal.findByIdAndUpdate(id,{isCompleted:TRUE});
        return res.json({isOkay:true,info:info});
    } catch(err) {
        return res.json({isOkay:false,err:err.message});
    }
});


app.listen(8080,async ()=>{
    await mongooseConnection();
    console.log("Server Started Running : 8080");
});