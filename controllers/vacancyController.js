const Vacancy = require('../models/Vacancy'); 

 
module.exports.create_vacancy = async (req, res) => {
    const {
        job_type,
        work_experience,
        employment_conditions,
        responsibilities,
        requirements,
        description,
        salary,
        name
    } = req.body; 

    console.log(res.locals)

    const new_vacancy = await Vacancy.create({
        job_type,
        work_experience,
        employment_conditions,
        description,
        responsibilities,
        requirements,
        description,
        salary,
        name,
        company_id: res.locals.company ? res.locals.company._id : null,
    });
    console.log(new_vacancy)
    

    res.send({new_vacancy})
}


module.exports.get_vacancies = async (req, res) => {
    const { query } = req;
    let filter_options = {}

    if(query && Object.keys(query).length){  
        for (let key in query){
            if(key != 'keyword' && query[key].toLowerCase()){
                filter_options[`${key}`] = query[key]
            }
        }

        console.log(filter_options.keyword)

        if (query.keyword) {
            // Use a regular expression to perform a case-insensitive search
            filter_options['name'] = { $regex: query.keyword, $options: "i" };
        }
    };
 
    
    const vacancies = await Vacancy.find(filter_options)

    res.send({vacancies})
}