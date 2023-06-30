const Vacancy = require('../models/Vacancy'); 

 
module.exports.create_vacancy = async (req, res) => {
    const {
        job_type,
        work_experience,
        employment_conditions,
        responsibilities,
        salary
    } = req.body;
    const vacancy = await Vacancy.findById({_id: res.locals.company.id});

    vacancy.set({
        job_type,
        work_experience,
        employment_conditions,
        responsibilities,
        salary,
        company_id: company._id
    });

    vacancy.save()

    res.send({vacancy})
}


module.exports.get_vacancies = async (req, res) => {

    
    const vacancies = await Vacancy.find()

    res.send({vacancies})
}