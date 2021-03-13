(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
const videoContainer = document.getElementById("video-container")
const myVideo = document.createElement("video")
myVideo.muted = true
const socket = io();

const myPeer = new Peer(undefined, {
	host: '/',
	port: '3001'
});/* 
const myPeer = new Peer(undefined, {
						host: '/',
						port: 9000,
						path: '/myapp'
					}); */
let peers = {}

navigator.getMedia = (navigator.getUserMedia ||
	navigator.webkitGetUserMedia ||
		navigator.mozGetUserMedia ||
		navigator.mediaDevices.getUserMedia ||
		navigator.msGetUserMedia);

navigator.getMedia({
		video : true,
		audio : false
	},function(stream){
		addVideoStream(myVideo,stream)
		
		myPeer.on("call",(call)=>{
			call.answer(stream)
			const video = document.createElement('video')
			call.on("stream",(uservideoStream)=>{
				addVideoStream(video,uservideoStream)
			})
		})
		
		socket.on("user-connected",(userId)=>{
			console.log("UserID",userId)
			connectToNewUser(userId,stream)
		})
	},function(err) {
		console.log("ERROR PROCESS : "+err);
	})


myPeer.on("open",(id)=>{
	socket.emit("join-room",ROOM_ID,id)
})

socket.on('user-disconnected', (userId)=>{
	if(peers[userId]) peers[userId].close()
})

function connectToNewUser(userId,stream){
	const call = myPeer.call(userId,stream)
	
	peers[userId] = call
	
	const video = document.createElement("video")
	call.on("stream",(uservideoStream)=>{
		addVideoStream(video,uservideoStream)
	})
	call.on('close',()=>{
		video.remove()
	})
}


function addVideoStream(video, stream){
	video.srcObject = stream
	video.addEventListener("loadedmetadata",()=>{
		video.play()
	})
	videoContainer.append(video)
}
},{}]},{},[1]);
