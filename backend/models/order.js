const mongoose = require("mongoose");
const { type } = require("os");
const { title } = require("process");



const orderScheme = new mongoose.Schema({
    customerName :{
        type: String, required:true,
    },

   products : [{
    title : String, 
    quantite :{
        type : Number,
        required : true,

    },

    price :{
        type : Number,
        required : true,
    }
   }],

   total :{
    type:Number,
    required : true,

   },
   orderDate : {
    type : Date,
    default : Date.now,
   },

   status :{
    type :String,
    enum : ['pending ' , 'processing' , 'sheped' , 'delivered' , 'cancelled'],
    default : 'pending',
   }
   
})

const Order = mongoose.model('Order', orderScheme)


module.exports =Order;