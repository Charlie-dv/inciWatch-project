const mongoose = require('mongoose');

const reporterSchema = new mongoose.Schema({
    fistName: {
        type: String,
        required: true
    },

    lastName:{
        type: String,
        required: true,
    },
    
    email:{
        type: String,
        required: true,
        unique: true
    },

    password:{
        type: String,
        required: true,
    },

    role:{
        type: String,
        enum: ['Admin', 'User', 'Reporter'],
        default: 'Reporter',
    },

    profilePicture: {
        public_id:{
            type:String
        },
        URL:{ type: String},
    },

});

module.exports = mongoose.model('Reporter', reporterSchema)


