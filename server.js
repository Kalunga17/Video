const express = require("express")
const ytdl = require("ytdl-core")
const fs = require("fs")
const { exec } = require("child_process")
const translate = require("@vitalets/google-translate-api")

const app = express()

app.use(express.json())
app.use(express.static("."))

app.post("/translate", async (req,res)=>{

let url=req.body.url

let stream=ytdl(url,{filter:"audioonly"})

let file="audio.mp3"

stream.pipe(fs.createWriteStream(file)).on("finish",()=>{

exec(`whisper ${file} --model base`, async ()=>{

let text=fs.readFileSync("audio.txt","utf8")

let translated=await translate(text,{to:"pt"})

res.json({text:translated.text})

})

})

})

app.listen(3000,()=>{

console.log("Servidor rodando")

})
