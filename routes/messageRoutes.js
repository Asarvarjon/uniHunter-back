 
const messagesController = require('../controllers/messagesController');
const { requireAuth, checkUser, checkCompany } = require('../middlewares/authMiddlewares');

const router = require("express").Router();

router.get("/messages/:id", requireAuth, checkUser, checkCompany, messagesController.get_messages); 
router.get("/chats/user", requireAuth, checkUser, messagesController.get_user_chats); 
router.get("/chats/company", requireAuth, checkCompany, messagesController.get_company_chats); 


// router.post("/messages/:id", AuthMiddleware, MessagesPostController); 

module.exports = router;