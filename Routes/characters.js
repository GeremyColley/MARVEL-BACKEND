const express = require("express");
const router = express.Router();
const axios = require("axios");

router.get("/characters", async (req, res) => {
    try{
        let page;
        if (Number(req.query.page) < 1) {
            page = 1;
        } else {
            page = Number(req.query.page);
        }
        const response = await axios.get(`https://lereacteur-marvel-api.herokuapp.com/characters?apiKey=${process.env.MARVEL_API_KEY}&limit=${page}`);
        res.json(response.data);
    }catch (error) {
        console.log(error.message);
    }
});

//http://localhost:4000/character/5fcf91f4d8a2480017b91453
router.get("/character/:id", async(req,res) => {
    try{
        console.log(req.params.id);
        //const jeton = "5fcf91f4d8a2480017b91453";
        const jeton = req.params.id;
        const response = await axios.get(`https://lereacteur-marvel-api.herokuapp.com/character/${jeton}?apiKey=${process.env.MARVEL_API_KEY}`);
        res.json(response.data);
    }catch(error){
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;