const express = require('express');
const router = express.Router();
const db = require('../config/db');

//GET /api/productos => Obtener todos los productos
router.get('/', async (req, res) => {
    res.status(200).json({ success: true, message: 'Lista de productos' });
});

module.exports = router;