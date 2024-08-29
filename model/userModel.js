const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
   
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
        default: 'Admin',
    },

    profilePicture:{
        public_id: {type: String},
        url: {type: String}
    },

  isAdmin:{
        type: Boolean,
        default: false
    },
})


userSchema.pre('save', async function (next){
    if (!this.isModified('password'))
        return next();
    this.password = await bcrypt.hash(this.password, 12);
    next();
});

userSchema.methods.comparePassword = async function (enterPassword){
    return await bcrypt.compare(enterPassword, this.password);
};

module.exports = mongoose.model('user', userSchema)


