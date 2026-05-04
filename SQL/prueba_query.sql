-- Active: 1776951351698@@127.0.0.1@3306@productos_db
USE productos_db;

SELECT * FROM productos;

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
    AND YEAR(fechacompra) = 2024;