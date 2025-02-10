require("dotenv").config();

const express = require("express");
const cors = require("cors");
const { exec } = require("child_process");
const path = require("path");
const fs = require("fs");
const Mailer = require("./Mailer");


const app = express();
app.use(cors());
app.use(express.json());

app.post("/convert", async (req, res) => 
{
    const { url } = req.body;

    console.log(req.body);
    console.log("URL : "+url);
    if (!url)
        return res.status(400).json({ error: "URL YouTube non fournie" });

    const downloadDir = path.join(__dirname, "Downloads");
    const fileName = "%(title)s.%(ext)s";

    if (!fs.existsSync(downloadDir)) 
      fs.mkdirSync(downloadDir);

    const downloadPath = path.join(downloadDir, fileName);
    

    console.log("Téléchargement de :", url);
    const command = `yt-dlp --ffmpeg-location /opt/homebrew/bin/ffmpeg --no-check-certificate -f bestaudio --extract-audio --audio-format mp3 --output "${downloadPath}" --print after_move:filename "${url}"`;

    exec(command, (error, stdout, stderr) => 
      {
        console.log(stdout);
        const downloadedFilePath = stdout.trim();
        console.log("Fichier téléchargé :", downloadedFilePath);
        if(error) 
        {
            console.error(`Erreur lors de l'exécution de yt-dlp: ${error.message}`);
            console.error(`stderr: ${stderr}`);
            console.error(`Erreur : ${stderr}`);
            return res.status(500).json({ error: "Impossible de récupérer l'audio." });
        }
        else
        {
          const service = process.env.MAILER_SERVICE;
          const user = process.env.MAILER_USER;
          const pass = process.env.MAILER_PASS;
          const Mail = new Mailer(service, user, pass); 
          
          const FName = path.basename(downloadedFilePath).split('.')[0]+".mp3";
          console.log("FNAME : "+FName);
          Mail.CreateMail(user, user, "Nouvelle musique de youtube.mp3 ! - "+FName, null, {filename: FName, path: downloadDir+"/"+FName});
          Mail.SendMail();

          return res.status(200).json({"msg":"ok"})
        }
    });
});

const PORT = 8000;
app.listen(PORT, () => console.log(`Serveur actif sur http://localhost:${PORT}`));
