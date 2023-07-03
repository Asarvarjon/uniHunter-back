const { Router } = require('express');
const vacancyController = require('../controllers/vacancyController');
const { requireAuth, checkUser } = require('../middlewares/authMiddlewares');

const router = Router();
 
router.post('/vacancy/create', /*requireAuth, checkUser,*/ vacancyController.create_vacancy); 
router.get('/vacancy/get', vacancyController.get_vacancies); 



module.exports = router;