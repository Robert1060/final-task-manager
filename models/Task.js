const mongoose = require('mongoose')

const taskSchema = new mongoose.Schema({
    name:{
        type:String,
        trim:true,
        minlength:[5, 'Name must provide more than 5 characters']
    },
    completed:{
        type:Boolean,
        default:false,
        required:false
    }
})

module.exports = mongoose.model('Task',taskSchema)