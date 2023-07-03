const Vacancy = require('../models/Vacancy'); 

 
module.exports.create_vacancy = async (req, res) => {
    const {
        job_type,
        work_experience,
        employment_conditions,
        responsibilities,
        requirements,
        salary
    } = req.body;
    const vacancy = await Vacancy.findById({_id: res.locals.company.id});

    vacancy.set({
        job_type,
        work_experience,
        employment_conditions,
        description,
        responsibilities,
        salary,
        company_id: company._id
    });

    vacancy.save()

    res.send({vacancy})
}


module.exports.get_vacancies = async (req, res) => {
    const { query } = req;
    let filter_options = {}

    if(query && Object.keys(query).length){  
        for (let key in query){
            if(query[key].toLowerCase()){
                filter_options[`${key}`] = query[key]
            }
        }

        if (filter_options.keyword) {
            // Use a regular expression to perform a case-insensitive search
            filter_options.keyword = { $regex: keyword, $options: "i" };
        }
    };


    
    const vacancies = await Vacancy.find(filter_options)

    res.send({vacancies})
}