let stream_type = false
let myStreaming_data = false
let streaming_data = data;
if (data=="room" || data == "video") {
	streaming_data = "video";
	stream_type = document.getElementById("video-container")
	myStreaming_data = document.createElement("video")
}else{
	streaming_data = "audio"
	stream_type = document.getElementById("audio-container")
	myStreaming_data = document.createElement("audio")

}

const socket = io();

const myPeer = new Peer(undefined, {
						host: "https://schoolbac-peerjs-server.herokuapp.com/",
						port: 443,
						secure : true
					}); 
let peers = {};

navigator.mediaDevices.getUserMedia({
		video : (streaming_data==="video") ? true : false,
		audio : true
	}).then((stream)=> {

		addStream(myStreaming_data,stream)
		
		myPeer.on("call",(call)=>{
			call.answer(stream)
			const streaming_data_type = document.createElement(streaming_data)
			call.on("stream",(userStream)=>{
				addStream(streaming_data_type,userStream)
			})
		})
		
		socket.on("user-connected",(userId)=>{
			connectToNewUser(userId,stream)
		})
		
	})


myPeer.on("open",(id)=>{
	socket.emit("join-room",ROOM_ID,{id:id,auth_call:false})
})

socket.on('user-disconnected', (userId)=>{
	if(peers[userId]) peers[userId].close()
	history.back();
})

function connectToNewUser(userId,stream){

	const call = myPeer.call(userId,stream)
	
	peers[userId] = call
	
	const streaming_data_type = document.createElement("video")
	call.on("stream",(userStream)=>{
		addStream(streaming_data_type,userStream)
	})
	call.on('close',()=>{
		streaming_data_type.remove()
	})
}


function addStream(streaming_data_type, stream){

	streaming_data_type.srcObject = stream
	streaming_data_type.addEventListener("loadedmetadata",()=>{
		streaming_data_type.play()
	})
	stream_type.append(streaming_data_type)
	
}