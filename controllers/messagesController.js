const { isValidObjectId } = require("mongoose")
const User = require("../models/User")   
const Message = require("../models/Message") 


 
module.exports.get_messages = async (req, res) =>{ 
        try {
            const isValid = isValidObjectId(req.params.id)

            if(!isValid) throw new Error("Invalid")

            const receiver_id = req.params.id
             
            const chats = await Message.find({
              $or: [
                {
                  $and: [
                    { owner_id: res.locals.user._id },
                    { receiver_id: receiver_id }
                  ]
                },
                {
                  $and: [
                    { owner_id: receiver_id },
                    { receiver_id: res.locals.user._id }
                  ]
                }
              ]
            }).sort([["created_at", 1]])
            
 
 

            res.send(chats)
        } catch (error) {
            console.log(error + "");
            
        }
    }


module.exports.post_messages = async (req, res) =>{
        try { 

            if(!(isValidObjectId(res.locals.user._id) && isValidObjectId(req.params?.id))) throw new Error("Id is invalid!")


            const chat = await messages.create({
                message_text: message_text,
                owner_id:res.locals.user._id,
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


module.exports.get_user_chats = async (req, res) => {
    try { 
  
      const chats = await Message.aggregate([
        {
          $match: {
            owner_id: res.locals.user._id
          },
        },
        {
          $group: {
            _id: {
              owner_id: "$owner_id",
              receiver_id: "$receiver_id",
            },
            last_message: {
              $last: "$message_text",
            },
            created_at: {
              $last: "$created_at",
            },
          },
        },
        {
          $sort: {
            created_at: -1,
          },
        },
      ]);
  
      res.send(chats);
    } catch (error) {
      console.log(error + "");
      res.status(500).json({
        error: error + "",
      });
    }
  };  

  module.exports.get_company_chats = async (req, res) => {
    try { 
  
      const chats = await Message.aggregate([
        {
          $match: {
            owner_id: res.locals.company._id
          },
        },
        {
          $group: {
            _id: {
              owner_id: "$owner_id",
              receiver_id: "$receiver_id",
            },
            last_message: {
              $last: "$message_text",
            },
            created_at: {
              $last: "$created_at",
            },
          },
        },
        {
          $sort: {
            created_at: -1,
          },
        },
      ]);
  
      res.send(chats);
    } catch (error) {
      console.log(error);
      res.status(500).json({
        error: error + "",
      });
    }
  }; 