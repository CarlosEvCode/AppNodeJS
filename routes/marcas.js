const express = require("express");
const router = express.Router();
const db = require("../config/db");

//GET /api/marcas => Obtener todas las marcas
router.get("/", async (req, res) => {
  try {
    const [rows] = await db.query(
      "SELECT * FROM marcas ORDER BY nombremarca ASC",
    );
    res.status(200).json({ success: true, data: rows });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error al obtener las marcas" });
  }
});

//Buscador por id
router.get("/:id", async (req, res) => {
  try {
    //params = valor ingresa en la url
    const idBuscado = req.params.id;
    const [rows] = await db.query("SELECT * FROM marcas WHERE id = ?", [
      idBuscado,
    ]);
    if (rows.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Marca no encontrada" });
    }
    res.status(200).json({ success: true, data: rows[0] });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error al obtener la marca" });
  }
});

router.post("/", async (req, res) => {
  try {
    const { nombremarca } = req.body;
    if (!nombremarca || nombremarca.trim() === "") {
      return res.status(400).json({
        success: false,
        message: "El nombre de la marca es obligatorio",
      });
    }

    //Insertar en la base de datos
    const [result] = await db.query(
      "INSERT INTO marcas (nombremarca) VALUES (?)",
      [nombremarca],
    );
    res.status(201).json({
      success: true,
      message: "Marca creada correctamente",
      data: { id: result.insertId, nombremarca },
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error al crear la marca" });
  }
});
router.put("/:id", async (req, res) => {
  try {
    const idMarca = req.params.id;
    const { nombremarca } = req.body;
    if (!nombremarca || nombremarca.trim() === "") {
      return res.status(400).json({
        success: false,
        message: "El nombre de la marca es obligatorio",
      });
    }
    //Actualizar en la base de datos
    const [result] = await db.query(
      "UPDATE marcas SET nombremarca = ? WHERE id = ?",
      [nombremarca, idMarca],
    );

    if (result.affectedRows === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Marca no encontrada" });
    }

    //status = 200
    res.status(200).json({
      success: true,
      message: "Marca actualizada correctamente",
      data: { id: idMarca, nombremarca },
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error al actualizar la marca" });
  }
});
router.delete("/:id", async (req, res) => {
  try {
    //Hace falta una validacion... Si el producto tiene esta marca => no se puede eliminar : Dependencia foranea
    const idMarca = req.params.id;

    const [productos] = await db.query("SELECT COUNT(*) AS total FROM productos WHERE idmarca = ?", [idMarca,]);
    //COUNT(*) => devuelve un numero (total) => total > 0 => tiene productos asociados => no se puede eliminar
    if (productos[0].total > 0) {
      return res.status(409).json({
        success: false,
        message: "No se puede eliminar la marca porque tiene productos asociados", data: { totalProductos: productos[0].total },
      });
    }

    const [result] = await db.query("DELETE FROM marcas WHERE id = ?", [
      idMarca,
    ]);
    if (result.affectedRows === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Marca no encontrada" });
    }
    res
      .status(200)
      .json({ success: true, message: "Marca eliminada correctamente" });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error al eliminar la marca" });
  }
});

module.exports = router;
