const express = require("express");
const router = express.Router();
const axios = require("axios");


// factoriser la string pour une url générique

router.get("/comics", async (req, res) => {
    try{
        let page;
        if (Number(req.query.page) < 1) {
            page = 1;
        } else {
            page = Number(req.query.page);
        }
        const response = await axios.get(`https://lereacteur-marvel-api.herokuapp.com/comics?apiKey=${process.env.MARVEL_API_KEY}&limit=${page}`);
        res.json(response.data);
    }catch (error) {
        console.log(error.message);
    }
});

router.get("/comics/:id", async(req,res) => {
    try{
        console.log(req.params.id);
        //const jeton = "5fcf91f4d8a2480017b91453";
        const jeton = req.params.id;
        const response = await axios.get(`https://lereacteur-marvel-api.herokuapp.com/comics/${jeton}?apiKey=${process.env.MARVEL_API_KEY}`);
        res.json(response.data);
    }catch(error){
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;