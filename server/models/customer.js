const mongoose = require('mongoose');

const { Schema } = mongoose;
const customerSchema = new Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50,
    },
    isGold: { type: Boolean, default: false },
    phone: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50,
    },
});

mongoose.model('customers', customerSchema);
