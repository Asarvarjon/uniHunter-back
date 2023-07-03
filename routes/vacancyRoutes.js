const { Router } = require('express');
const vacancyController = require('../controllers/vacancyController');
const { requireAuth, checkUser, checkCompany } = require('../middlewares/authMiddlewares');

const router = Router();
 
router.post('/vacancy/create', requireAuth, checkUser, checkCompany, vacancyController.create_vacancy); 
router.get('/vacancy/get', vacancyController.get_vacancies); 



module.exports = router;