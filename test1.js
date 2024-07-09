const express = require('express');
const mongoose = require('mongoose');
const Product = require('./models/product');

const app = express();
const PORT = process.env.PORT || 3000;


mongoose.connect(mongodb+srv:mahtab:Mahtab123@cluster0.t2i2sux.mongodb.net/).then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.error('Error connecting to MongoDB:', err.message);
});


app.use(express.json());


app.get('/products', async (req, res) => {
    const minPrice = parseFloat(req.query.minPrice);

    if (isNaN(minPrice)) {
        return res.status(400).json({ error: 'Invalid minPrice parameter' });
    }

    try {
        const products = await Product.find({ price: { $gt: minPrice } }).sort({ price: -1 });
        res.json(products);
    } catch (err) {
        res.status(500).json({ error: 'Failed to retrieve products' });
    }
});


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
