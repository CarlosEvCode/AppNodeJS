const express = require('express');
const router = express.Router();
const PDFDocument = require('pdfkit');
const db = require('../config/db');

// Ruta para generar el reporte de productos
router.get('/productos', async (req, res) => {
  const sql = `
  SELECT 
    p.id, 
    p.idmarca, 
    p.nombre, 
    p.precio, 
    p.garantia, 
    p.descripcion, 
    p.fechacompra, 
    m.nombremarca
FROM productos p
    INNER JOIN marcas m ON p.idmarca = m.id
    WHERE garantia = 12
    AND YEAR(fechacompra) = 2024
  `
  const [productos] = await db.query(sql);

  // Construir el PDF
  //Paso 1: Especificar al navegador que se va a enviar un PDF
  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', 'attachment; filename=reporte.pdf'); //Descargar

  //Paso 2: Configuracion de la hoja de reporte
  const doc = new PDFDocument({margin: 50});
  doc.pipe(res); //Enviar el PDF al navegador

  //Paso 3: Agregar contenido al PDF
  doc.fontSize(18).text('Reporte de Productos', {align: 'center'});
  doc.moveDown();

  //Recorrer cada elemento encontrado y agregarlo al PDF
  productos.forEach(producto => {
    doc.fontSize(12).text(`Descripción: ${producto.descripcion}`);
  })

  //Paso 4: Finalizar el PDF
  doc.end();

});

module.exports = router;