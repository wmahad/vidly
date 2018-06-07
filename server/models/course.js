const mongoose = require('mongoose');

const { Schema } = mongoose;

const courseSchema = new Schema({
    name: { type: String, required: true },
    author: String,
    tags: {
        type: Array,
        validate: {
            validator: function(v) { return v && this.v.length > 0 },
            message: 'A course must have at least one tag',
        }
    },
    date: { type: Date, default: Date.now },
    isPublished: Boolean,
    price: { type: Number, required: function () { return this.isPublished } }
});

mongoose.model('course', courseSchema);
