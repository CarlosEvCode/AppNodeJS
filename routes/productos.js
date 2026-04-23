const express = require("express");
const router = express.Router();
const db = require("../config/db");

//GET /api/productos => Obtener todos los productos
router.get("/", async (req, res) => {
  try {
    const [rows] = await db.query(
      "SELECT * FROM productos ORDER BY nombre ASC",
    );
    res.status(200).json({ success: true, data: rows });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error al obtener los productos" });
  }
});

//Buscador por id
router.get("/:id", async (req, res) => {
  try {
    //params = valor ingresa en la url
    const idBuscado = req.params.id;
    const [rows] = await db.query("SELECT * FROM productos WHERE id = ?", [
      idBuscado,
    ]);
    if (rows.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Producto no encontrado" });
    }
    res.status(200).json({ success: true, data: rows[0] });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error al obtener el producto" });
  }
});

router.post("/", async (req, res) => {
  try {
    const { idmarca, nombre, precio, garantia, descripcion, fechacompra } =
      req.body;
    if (!nombre || nombre.trim() === "") {
      return res.status(400).json({
        success: false,
        message: "El nombre del producto es obligatorio",
      });
    }

    //Insertar en la base de datos
    const [result] = await db.query(
      "INSERT INTO productos (idmarca, nombre, precio, garantia, descripcion, fechacompra) VALUES (?, ?, ?, ?, ?, ?)",
      [idmarca, nombre, precio, garantia, descripcion, fechacompra],
    );
    res.status(201).json({
      success: true,
      message: "Producto creado correctamente",
      data: {
        id: result.insertId,
        idmarca: idmarca,
        nombre: nombre,
        precio: precio,
        garantia: garantia,
        descripcion: descripcion,
        fechacompra: fechacompra,
      },
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error al crear el producto" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const idProducto = req.params.id;
    const { idmarca, nombre, precio, garantia, descripcion, fechacompra } =
      req.body;
    if (!nombre || nombre.trim() === "") {
      return res.status(400).json({
        success: false,
        message: "El nombre del producto es obligatorio",
      });
    }
    //Actualizar en la base de datos
    const [result] = await db.query(
      "UPDATE productos SET idmarca = ?, nombre = ?, precio = ?, garantia = ?, descripcion = ?, fechacompra = ? WHERE id = ?",
      [idmarca, nombre, precio, garantia, descripcion, fechacompra, idProducto],
    );

    if (result.affectedRows === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Producto no encontrado" });
    }

    //status = 200
    res.status(200).json({
      success: true,
      message: "Producto actualizado correctamente",
      data: {
        id: idProducto,
        idmarca: idmarca,
        nombre: nombre,
        precio: precio,
        garantia: garantia,
        descripcion: descripcion,
        fechacompra: fechacompra,
      },
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error al actualizar el producto" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const idProducto = req.params.id;
    const [result] = await db.query("DELETE FROM productos WHERE id = ?", [
      idProducto,
    ]);
    if (result.affectedRows === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Producto no encontrado" });
    }
    res
      .status(200)
      .json({ success: true, message: "Producto eliminado correctamente" });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error al eliminar el producto" });
  }
});

module.exports = router;
