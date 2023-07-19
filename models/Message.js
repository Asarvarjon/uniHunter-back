const mongoose = require("mongoose")

const MessagesSchema = new mongoose.Schema({
    message_text: {
        type: String,
        required: true, 
    } ,
    owner_id: {
        type: mongoose.Schema.Types.ObjectId,
        populate: {
            path: "owner", 
        }
    
    }, 
    receiver_id: {
        type: mongoose.Schema.Types.ObjectId,
        
    },
    created_at: {
        type: Date,
        default: new Date()
    }
}
)

const Message = mongoose.model("messages", MessagesSchema);
 module.exports = Message;
