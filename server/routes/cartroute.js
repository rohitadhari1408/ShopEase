const express = require('express');
const CartItem = require('../models/cartitem');
const router = express.Router();

router.post('/', async (req, res) => {
  const item = req.body;
  const existingItem = await CartItem.findOne({ id: item.id });
  if (existingItem) {
    existingItem.quantity += 1;
    await existingItem.save();
    return res.json(existingItem);
  }
  const newItem = new CartItem(item);
  await newItem.save();
  res.json(newItem);
});

router.get('/', async (req, res) => {
  const items = await CartItem.find();
  res.json(items);
});
let cart = []; // Example cart array (in-memory)

// DELETE item from cart by ID
router.delete('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = cart.findIndex(item => item.id === id);

  if (index !== -1) {
    cart.splice(index, 1);
    res.status(200).json({ message: 'Item removed from cart' });
  } else {
    res.status(404).json({ error: 'Item not found' });
  }
});

module.exports = router;
