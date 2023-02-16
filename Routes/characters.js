const express = require("express");
const router = express.Router();
const axios = require("axios");


const trace1 = (limit, skip, name) => {
    console.log("=======================");
    console.log("Limit : " + limit);
    console.log("Skip  : " + skip);
    console.log("Name  : " + name);
    console.log("=======================");
}
const trace2 = (id) => {
    console.log("=======================");
    console.log("id : " + id);
    console.log("=======================");
}
//===============================================
//  Query   |	Info                | Required
//-----------------------------------------------
//  apiKey	|   API key received    |	Yes
//-----------------------------------------------
//  limit	|   between 1 and 100	|   No
//-----------------------------------------------
//  skip	|   number of results   |   No
//          |   to ignore	        |
//-----------------------------------------------
//  name    |   search a character  |   No
//          |   by name	            |
//-----------------------------------------------
const urlCharacters = (limit, skip, name) => {
    let bufferLimit = !limit ? 1 : limit;
    let bufferSkip = !skip ? 1 : skip;
    let bufferName = !name ? "" : name;
    trace1(bufferLimit,bufferSkip,bufferName)
    return `https://lereacteur-marvel-api.herokuapp.com/characters?apiKey=${process.env.MARVEL_API_KEY}&limit=${bufferLimit}&skip=${bufferSkip}&name=${bufferName}`;
};



//===============================================
//Params
//-----------------------------------------------
//  Params	    |   Info	    |  Required
//-----------------------------------------------
//  characterId	|   characters  |   Yes
//              |  mongoDB id   |	
//-----------------------------------------------
//===============================================
//Query
//-----------------------------------------------
//  Query    |	Info	         | Required
//-----------------------------------------------
//  apiKey	|  API key received  | Yes
//-----------------------------------------------
const urlCharacter = (id) => {
    let bufferId = !id ? "" : id;
    trace2(id);
    return `https://lereacteur-marvel-api.herokuapp.com/character/${bufferId}?apiKey=${process.env.MARVEL_API_KEY}`;
};

router.get("/characters", async (req, res) => {
    try{
        let page;
        if (Number(req.query.page) < 1) {
            page = 1;
        } else {
            page = Number(req.query.page);
        }
        const response = await axios.get(urlCharacters(req.query.page,req.query.limit,req.query.name));
        res.json(response.data);
    }catch (error) {
        console.log(error.message);
    }
});

router.get("/character/:id", async(req,res) => {
    try{
        console.log(req.params.id);
        //const jeton = "5fcf91f4d8a2480017b91453"; //http://localhost:4000/character/5fcf91f4d8a2480017b91453
        const jeton = req.params.id;
        const response = await axios.get(urlCharacter(jeton));
        res.json(response.data);
    }catch(error){
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;

