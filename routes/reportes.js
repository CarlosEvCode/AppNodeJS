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
  //db.query(consulta_sql, [param1, param2, ...])
  //WHERE garantia = ? AND YEAR(fechacompra) = ?
  //Informacion entrada (input) - req (require) req.params, req.query, req.body
  const [productos] = await db.query(sql);

  // Construir el PDF
  //Paso 1: Especificar al navegador que se va a enviar un PDF
  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', 'inline; filename=reporte.pdf'); //Descargar (attachment), Visualizar (inline) => Content-Disposition: inline; filename=reporte.pdf

  //Paso 2: Configuracion de la hoja de reporte
  const doc = new PDFDocument({margin: 50});
  doc.pipe(res); //Enviar el PDF al navegador

  //Paso 3: Agregar contenido al PDF
  doc.fontSize(18).text('Reporte de Productos', {align: 'center'});
  doc.moveDown();

  //Recorrer cada elemento encontrado y agregarlo al PDF
  doc.table().row(['Nombre', 'Precio', 'Garantía'], {header: true});
  productos.forEach(producto => {
    //doc.fontSize(12).text(`Descripción: ${producto.descripcion}`); //Enviar texto sin formato
    doc.table({
        data: [
            [producto.nombre, producto.precio, producto.garantia]
        ]
    });
  });

  const tPrueba = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
  doc.moveDown();
    doc.text(tPrueba, {
        width: 500,
        columns: 2,
        columnGap: 15,
        height: 100,
        align: 'justify'

    });

    doc.moveDown();
  doc.text(`Total de productos: ${productos.length}`, {align: 'right'});
  doc.text(`Fecha de generación: ${new Date().toLocaleString()}`, {align: 'right'});

  //Paso 4: Finalizar el PDF
  doc.end();

});

module.exports = router;