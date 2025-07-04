
CREATE DATABASE prueba_pasante;
GO
USE prueba_pasante;
GO

CREATE TABLE dbo.productos (
  id INT IDENTITY(1,1) PRIMARY KEY,
  nombre NVARCHAR(100) NOT NULL,
  descripcion NVARCHAR(MAX),
  precio DECIMAL(10,2) NOT NULL,
  activo BIT DEFAULT 1,
  creado_en DATETIME2 DEFAULT SYSDATETIME()
);
