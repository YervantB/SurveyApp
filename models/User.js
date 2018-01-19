const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    googleID: String, 
    last_name: String,
    first_name: String,
    member_since: {type: Date, default: Date.now()}
},{
    versionKey: false
});

mongoose.model('users', userSchema);
