socket.on('USER-CALL',(userAuth)=>{

    $("ul").toggleClass("call-visibility");
    $(".diag").toggleClass("call-visibility");
    $(".diag p").html(`${userAuth.USER_AUTH_LOGIN}<br><span class="icon-user"> </span><br>Appel entrant`);
    
    $("span.icon-phone-hang-up").click(function(){
        $("ul").toggleClass("call-visibility");
        $(".diag").toggleClass("call-visibility");
        socket.emit("join-room",`:${userAuth.USER_AUTH_ID}`,{id:userAuth.USER_AUTH_ID,auth_call: userAuth.USER_AUTH_ID})
    })

    $("span#call-accept").click(()=>{window.location = "/"+userAuth.USER_CALL+":"+userAuth.USER_AUTH_ID})

})

$("span#end").click(()=>{history.back()})

socket.on("HANG-UP-SHOW",()=>history.back())