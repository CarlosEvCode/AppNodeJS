const express = require('express');
const router = express.Router();
const db = require('../config/db');

//GET /api/marcas => Obtener todas las marcas
router.get('/', async (req, res) => {
    res.status(200).json({ success: true, message: 'Lista de marcas' });
});

module.exports = router;