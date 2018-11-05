const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    firstName: {type: String, required: true, trim: true},
    lastName: {type: String, required: true, trim: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    createdDate: {type: Date, default: Date.now, required: false},
    hasAdminPrevilieges: {type: Boolean, default: false},
    orders: {type: Array, default: []},
    phone: [{type: Number, required: false}],
    address: {
        street: {type: String, required: false, trim: true},
        city: {type: String, required: false, trim: true},
        state: {type: String, required: false, trim: true},
        pin: {type: Number, required: false},
        country: {type: String, required: false, trim: true}
    }
});

userSchema.index({email: 1});

module.exports = mongoose.model('User', userSchema);

