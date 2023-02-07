import mongoose from 'mongoose';

const Cards = new mongoose.Schema({
    city: {type: String, required: false},
    club: {type: String, required: false},
    date: {type: String, required: false},
    link: {type: String, required: false}
})

export default mongoose.model('Cards', Cards);