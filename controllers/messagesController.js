const { isValidObjectId } = require("mongoose")
const User = require("../models/User")   
const Message = require("../models/Message") 


 
module.exports.get_messages = async (req, res) =>{ 
        try {
            const isValid = isValidObjectId(req.params.id)

            if(!isValid) throw new Error("Invalid")

            const receiver_id = await User.findOne({
                _id: req.params.id,
            })

            if(!receiver_id) throw new Error("User not found")

            const chats = await Message.find({
                $o: [
                    {
                        $and: [
                            {
                                owner_id: req.user._id
                            },
                            {
                                receiver_id: receiver_id._id
                            }
                        ]
                    },
                    {
                        $and: [
                            {
                                owner_id: receiver_id._id
                            },
                            {
                                receiver_id: req.user._id
                            }
                        ]
                    }
                ]
            }).sort([["created_at", 1 ]])
 
 

            res.send(chats)
        } catch (error) {
            console.log(error + "");
            
        }
    }


module.exports.post_messages = async (req, res) =>{
        try { 

            if(!(isValidObjectId(req.user._id) && isValidObjectId(req.params?.id))) throw new Error("Id is invalid!")


            const chat = await messages.create({
                message_text: message_text,
                owner_id: req.user._id,
                receiver_id: req.params.id,
            })
 

            res.json({
                ok: true
            })
        } catch (error) {
            console.log(error);
            res.json({
                ok:false,
                error: error + ""
            })
        }
} 