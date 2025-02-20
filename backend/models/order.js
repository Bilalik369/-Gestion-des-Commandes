const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    customerName: {
        type: String,
        required: true,
        trim: true
    },

    products: [{
        title: {
            type: String,
            required: true,
            trim: true
        },
        quantity: {
            type: Number,
            required: true,
            min: 1 
        },
        price: {
            type: Number,
            required: true,
            min: 0 
        }
    }],

    total: {
        type: Number,
        required: true,
        min: 0 
    },

    orderDate: {
        type: Date,
        default: Date.now
    },

    status: {
        type: String,
        enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'],
        default: 'pending'
    }
});


const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
