const {Schema, model} = require('mongoose');

const schema = new Schema({
    name: {type: String, required: [true, 'Name is required!'], minLength: ['4', 'Hotel\'s name must be at least 4 character long!']},
    city:{type: String, required: [true, 'City is required!'], minLength: ['3', 'City\'s name must be at least 3 character long!']},
    imageUrl: {type: String, required: [true, 'Image is required!'], match: [/^https?/, 'Image must be a valid URL!']},
    rooms:{type: Number, required:[true, 'Number of rooms is required!'], min: [1, 'Please, at least one!'], max: [100, 'The limit is 100!']},
    bookedBy: [{type: Schema.Types.ObjectId, ref: 'User'}],
    owner: {type: Schema.Types.ObjectId, ref: 'User', required: true}
})

module.exports = model('Hotel', schema);