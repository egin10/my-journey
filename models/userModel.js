const mongoose = require('mongoose'),
    bcrypt = require('bcrypt-nodejs'),
    Schema = mongoose.Schema;

const userSchema = new Schema ({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

//hashing password
userSchema.methods.generateHash = password => {
    bcrypt.hashSync(password, genSaltSync(8), null);
};

userSchema.methods.validPassword = password => {
    bcrypt.compareSync(password, this.password);
};


module.exports = mongoose.model('User', userSchema);