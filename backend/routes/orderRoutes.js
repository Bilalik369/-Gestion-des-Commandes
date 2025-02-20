const express = require('express');
const router = express.Router(); 
const Order = require('../models/order'); 


router.post('/orders', async (req, res) => {
    try {
        const { customerName, products, total, status } = req.body;
        if (!customerName || !products || !total || !status) {
            return res.status(400).json({ message: 'Tous les champs sont obligatoires' });
        }

        const newOrder = new Order({
            customerName, products, total, status
        });
        await newOrder.save();
        res.status(201).json(newOrder);
    } catch (err) {
        res.status(500).json({ message: 'Erreur d\'ajout' });
    }
});


router.get('/orders', async (req, res) => {
    try {
        const orders = await Order.find(); 
        if (!orders.length) {
            return res.status(404).json({ message: 'Aucune commande trouvée' });
        }
        res.status(200).json(orders);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


router.put('/orders/:id', async (req, res) => {
    try {
        const { status } = req.body;
        const validStatuses = ['pending', 'processing', 'shipped', 'delivered', 'cancelled'];

        if (!validStatuses.includes(status)) {
            return res.status(400).json({ message: "Statut invalide" });
        }

        const updatedOrder = await Order.findByIdAndUpdate(req.params.id, { status }, { new: true });
        if (!updatedOrder) {
            return res.status(404).json({ error: 'Commande non trouvée' });
        }
        res.status(200).json(updatedOrder); 
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


router.delete('/orders/:id', async (req, res) => {
    try {
        const deletedOrder = await Order.findByIdAndDelete(req.params.id);
        if (!deletedOrder) {
            return res.status(404).json({ message: "Commande non trouvée" });
        }
        res.status(200).json({ message: "Commande supprimée" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
