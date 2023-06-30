const mongoose = require('mongoose'); 

const vacancySchema = new mongoose.Schema({
    salary: {
        type: Number, 
        unique: true, 
    },
    responsibilities: {
        type: String,   
    },
    employment_conditions: { 
        type: String,  
    },
    work_experience: { 
        type: String,  
    },
    job_type: {
        type: String, 
        required: [true, "Please enter job type"],
    }, 
    company_id: { type: mongoose.Schema.Types.ObjectId, ref: 'company' }
});

 
const User = mongoose.model('vacancy', vacancySchema);

module.exports = User;