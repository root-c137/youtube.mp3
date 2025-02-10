
const express = require("express");
const cors = require("cors");


const app = express();
app.use(cors());
app.use(express.json());

app.post("/convert", async (req, res) => 
{
    const { url } = req.body;

    console.log(req.body);
    console.log("URL : "+url);


    return res.status(200).json({"msg":"ok"})
});

const PORT = 8000;
app.listen(PORT, () => console.log(`Serveur actif sur http://localhost:${PORT}`));
