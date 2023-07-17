 
const messagesController = require('../controllers/messagesController');
const { requireAuth, checkUser, checkCompany } = require('../middlewares/authMiddlewares');

const router = require("express").Router();

router.get("/messages/:id", requireAuth, checkUser, checkCompany, messagesController.get_messages); 
// router.post("/messages/:id", AuthMiddleware, MessagesPostController); 

module.exports = router;