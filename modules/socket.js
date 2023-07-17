const Session = require("../models/Session")  
const { isValidObjectId } = require("mongoose");
const Message = require("../models/Message");


module.exports = function handelSocket(io){
    io.on("connection", (data) => {  
         new_user_check(data);
         send_message_emitter(data)
    })
}


 function new_user_check(socket) {
    socket.on("new_connection", async data => {
        
        try { 

            let token = await checkToken(data.token);

            const user_session = await Session.findOneAndUpdate({
                _id: token.session_id
            }, {
                socket_id: socket.id
            })

            socket.emit("connected", {
                ok: true
            })
 
        } catch (error) {
            console.log(error);
        }
    })
}

function send_message_emitter(socket){
    socket.on("send_message", async data => {
       const socket_session = await Session.findOne({
           socket_id: socket.id
       })  

        if(!socket_session) return;

        if(!(data.message_text && data.message_text.length >= 2 && data.message_text.length < 1024)) {
            return;
        }


        if(!isValidObjectId(data.receiver_id)) return;

        const chat = await Message.create({
            message_text: data.message_text,
            owner_id: socket_session.owner_id,
            receiver_id: data.receiver_id,
        }) 


        let receiver_sessions = await Session.find({
            owner_id: data.receiver_id,
        })

        receiver_sessions = await receiver_sessions.map((s) => s.socket_id );
        receiver_sessions = await receiver_sessions.filter((s) => s ); 
        
        socket.to(receiver_sessions).emit("new_message", data.message_text);
         
    })
}

async function checkToken(token) {
    try {
        return verify(token, 'secret');
    } catch (error) {
        return false
    }
}