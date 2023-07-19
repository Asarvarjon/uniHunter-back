const { Router } = require('express');
const companyController = require('../controllers/companyController');
const { requireAuth, checkCompany } = require('../middlewares/authMiddlewares');

const router = Router();

router.post('/company/signup', companyController.signup_post);
router.post('/company/login', companyController.login_post);
router.get('/company/logout', companyController.logout_get);

router.put('/company/update-profile', requireAuth, checkCompany, companyController.profile_update);
router.get('/companies', requireAuth, checkCompany, companyController.get_all_companies);

router.get('/company/:id', requireAuth, checkCompany, companyController.get_one_company)


module.exports = router;