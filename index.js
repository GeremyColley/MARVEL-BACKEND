require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();

const charactersRoutes = require("./Routes/characters");
const comicsRoutes = require("./Routes/comics");
app.use(charactersRoutes);
app.use(comicsRoutes);
app.use(express.json());
app.use(cors);

app.get("/start" , (req,res)=>{
    res.status(200).json({ message: "Hello I'm running...." });
});

app.all("*", (req, res) => {
    res.status(404).json({ message: "This routes doesn't exist" });
});
  
app.listen(process.env.PORT, () => {
    console.log("Server started");
});