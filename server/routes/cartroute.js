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

// DELETE item from cart by product ID
router.delete('/:id', async (req, res) => {
  const id = parseInt(req.params.id);

  try {
    const deletedItem = await CartItem.findOneAndDelete({ id: id });

    if (deletedItem) {
      res.status(200).json({ message: 'Item removed from cart' });
    } else {
      res.status(404).json({ error: 'Item not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Server error while removing item' });
  }
});

module.exports = router;
