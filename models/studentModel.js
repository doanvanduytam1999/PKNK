const mongoose = require('mongoose');


const StudentSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Please provide name']
        },
        MSSV: {
            type: String,
            required: [true, 'Please provide MSSV'],
            
        },
        class: {
            type: String,
            required: [true, 'Please provide class']
        },
        image:{
            type: String,
            required: [true, 'Please provide URL image']
        }
    }, 
    
);


const Student = mongoose.model('Student', StudentSchema);

module.exports = Student;