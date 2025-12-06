const express = require("express");
const mongoose = require("mongoose");

const app = express();
mongoose.connect("mongodb://127.0.0.1:27017/cardb");
const schema = new mongoose.Schema({ carname: String, carnumber: Number, carcolor: String });
const CarModel = mongoose.model("cardetails", schema);

app.use(express.json());

app.get("/cars", async (req, res) => {
    try {
        const rs = await CarModel.find().exec();
        res.json(rs);
    }
    catch (error) {
        res.status(500).send(error);
    }
});
app.post("/addcar", async (req, res) => {
    try {
        const car = new CarModel(req.body);
        const rs = await car.save();
        res.json(rs);
    }
    catch (error) {
        res.status(500).send(error);
    }
});
app.get("/carget/:carnumber",async (req,res)=>{
    try{
        const rs= await CarModel.findOne({carnumber:req.params.carnumber}).exec();
        res.json(rs);
    }
    catch (error) {
        res.status(204).send(error);
    }
});

app.put("/carupdate/:carnumber",async (req,res)=>{
    try{
        const car= await CarModel.findOne({carnumber:req.params.carnumber}).exec();
       car.set(req.body);
     const rs = await car.save();
        res.json(rs);
    }
    catch (error) {
        res.status(204).send(error);
    }
});
app.delete("/deletecar/:carnumber",async (req,res)=>{
    try{
        const rs= await CarModel.deleteOne({carnumber:req.params.carnumber}).exec();
        res.json(rs);
    }
    catch(error){
        res.status(500).json(error);
    }
});
app.listen(8081,()=>{
    console.log("server started.....");
})


