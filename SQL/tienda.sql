CREATE DATABASE tiendanode;
USE tiendanode;

CREATE TABLE IF NOT EXISTS marcas(
    id          INT AUTO_INCREMENT PRIMARY KEY,
    nombremarca VARCHAR(100) NOT NULL,
    created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
)ENGINE=InnoDB;

/* INSERT INTO marcas (nombremarca) VALUES ('Samsung');
UPDATE marcas SET nombremarca = 'Gigabyte' WHERE id = 1; */

SELECT * FROM marcas;

CREATE TABLE IF NOT EXISTS productos(
    id          INT AUTO_INCREMENT PRIMARY KEY,
    idmarca     INT,
    nombre      VARCHAR(100) NOT NULL,
    precio      DECIMAL(10, 2) NOT NULL,
    garantia    VARCHAR(50) NOT NULL,
    descripcion VARCHAR(255) NOT NULL,
    fechacompra DATE NOT NULL,
    created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (idmarca) REFERENCES marcas(id)
)ENGINE=InnoDB;

INSERT INTO productos (idmarca, nombre, precio, garantia, descripcion, fechacompra) 
VALUES
(1, 'Monitor Samsung 24"', 199.99, '2 años', 'Monitor de alta resolución con tecnología LED', '2023-01-15'),
(1, 'Teclado Mecánico Samsung', 89.99, '1 año', 'Teclado mecánico con retroiluminación RGB', '2023-02-20'),
(1, 'Ratón Inalámbrico Samsung', 49.99, '1 año', 'Ratón inalámbrico con sensor óptico de alta precisión', '2023-03-10');

UPDATE productos SET descripcion = 'Monitor de alta resolución con tecnología LED y soporte para FreeSync' WHERE id = 1;

SELECT * FROM productos;