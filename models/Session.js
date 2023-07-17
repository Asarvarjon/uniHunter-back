const mongoose = require("mongoose")

const SessionsSchema = new mongoose.Schema({
    owner_id: {
        type: mongoose.Schema.Types.ObjectId,
        
    }, 
    user_agent: {
        type: String,
        required: true, 
    },
    created_at: {
        type: Date,
        default: new Date(),
    },
    socket_id: {
        type: String
    },

}
)

const Session = mongoose.model("sessions", SessionsSchema);
 module.exports = Session