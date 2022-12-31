let socket =io()// esto es el io del cliente
let usuario= ''

let chatBox= document.getElementById('chatBox')

Swal.fire({
    title:'Authentication',
    input:'text',
    text: 'Set username for the chat',
    inputValidator: value =>{
        return !value.trim() && 'please, write a username' 
    },
    allowOutsideClick:false
}).then(result =>{
    usuario=result.value
    document.getElementById('username').innerHTML=usuario
    
})

//enviamos mensaje
chatBox.addEventListener('keyup' , e => {
     if(e.key === 'Enter'){
        if(chatBox.value.trim().length > 0){
            socket.emit('message', {
                usuario,
                message: chatBox.value
            })

            chatBox.value =''
        }
     }
})

//recibimos mensaje

socket.on('logs', data=>{
    const divLOG=document.getElementById('messageLogs')

    let messages=''

    data.reverse().forEach(message => {
        messages += `<p><i>${message.usuario} </i> : ${message.message}</p>`
    });

    divLOG.innerHTML = messages
})