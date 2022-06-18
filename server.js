const express = require('express');

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
    res.send("server is up and running");
});

app.post("/create",(req, res) => {
    const {goal,motivation,secretKey} = req.body;
    console.log(req.body);
    res.json({goal,motivation,secretKey});
});


app.listen(8080,()=>{
    console.log("Server Started Running : 8080");
});