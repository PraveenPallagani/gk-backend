const mongoose = require('mongoose');

const goalSchema = new mongoose.Schema({
    goal:String,
    motivation:String,
    startDate:{type:Date,default:Date.now},
    endData:{type:Date,default:Date.now},
    keeper:String
});

const Goal = mongoose.model('Goal',goalSchema);

module.exports = Goal;
