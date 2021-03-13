

require("dotenv").config();
const express = require("express")
const app = express();
const server = require("http").Server(app)
const { config } = require("process");
const PORT = process.env.port || 5001;

const allUser = {};

app.set("views","./view")
app.set("view engine","ejs")
app.use(express.static("public"))
app.use(express.urlencoded({    
	extended : true
}))

app.get("/",(req,res)=>{
	res.render("login");
})

app.post('/login',(req,res)=>{
	const username = req.body.username
	res.render("pages/room",{username:username, stream:"room"});
})

app.get('/room:room',(req,res)=>{
	res.render("pages/room",{roomId:req.params.room, stream:"room" })
})

app.get('/video:room',(req,res)=>{
	res.render("pages/video",{roomId:req.params.room, stream:"video" })
})

app.get('/audio:room',(req,res)=>{
	res.render("pages/audio",{roomId:req.params.room, stream:"audio"})
})


 server.listen(PORT,()=>{console.log(`Server running on port ${PORT}`)})