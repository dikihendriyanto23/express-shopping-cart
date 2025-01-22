--pastikan database yang aktif adalah :
--ShoppingChart

USE ShoppingCart;
GO

--Tabel Products
CREATE TABLE Products (
    ProductID INT IDENTITY(1,1) PRIMARY KEY,
    Name NVARCHAR(100) NOT NULL,
    Description NVARCHAR(MAX),
    Price DECIMAL(10, 2) NOT NULL,
    Stock INT NOT NULL,
    CreatedAt DATETIME DEFAULT GETDATE(),
	updatedAt DATETIME DEFAULT GETDATE()
);

--Tabel Carts
CREATE TABLE Carts (
    CartID INT IDENTITY(1,1) PRIMARY KEY,
    CreatedAt DATETIME DEFAULT GETDATE(),
	updatedAt DATETIME DEFAULT GETDATE()
);

--Tabel CartItems
CREATE TABLE CartItems (
    CartItemID INT IDENTITY(1,1) PRIMARY KEY,
    CartID INT NOT NULL,
    ProductID INT NOT NULL,
    Quantity INT NOT NULL,
    FOREIGN KEY (CartID) REFERENCES Carts(CartID),
    FOREIGN KEY (ProductID) REFERENCES Products(ProductID)
);

--Tabel Addresses
CREATE TABLE Addresses (
    AddressID INT IDENTITY(1,1) PRIMARY KEY,
    CartID INT NOT NULL,
    AddressLine1 NVARCHAR(255) NOT NULL,
    AddressLine2 NVARCHAR(255),
    City NVARCHAR(100) NOT NULL,
    State NVARCHAR(100) NOT NULL,
    ZipCode NVARCHAR(20) NOT NULL,
    FOREIGN KEY (CartID) REFERENCES Carts(CartID)
);

--Tabel Orders
CREATE TABLE Orders (
    OrderID INT IDENTITY(1,1) PRIMARY KEY,
    CartID INT NOT NULL,
    OrderDate DATETIME DEFAULT GETDATE(),
    TotalAmount DECIMAL(10, 2),
    FOREIGN KEY (CartID) REFERENCES Carts(CartID)
);

--Data Dummy untuk Semua Tabel
--1. Products
INSERT INTO Products (Name, Description, Price, Stock)
VALUES 
('Laptop', 'High-end laptop for professionals.', 1500.00, 10),
('Smartphone', 'Latest model smartphone.', 800.00, 25),
('Headphones', 'Wireless headphones with noise cancellation.', 200.00, 50),
('Keyboard', 'Mechanical keyboard for gaming.', 120.00, 30);

--2. Carts
INSERT INTO Carts (CreatedAt)
VALUES 
(GETDATE()), 
(GETDATE()), 
(GETDATE());

--3. CartItems
INSERT INTO CartItems (CartID, ProductID, Quantity)
VALUES 
(1, 1, 2), -- Cart 1 contains 2 Laptops
(1, 3, 1), -- Cart 1 contains 1 Headphones
(2, 2, 3), -- Cart 2 contains 3 Smartphones
(3, 4, 5); -- Cart 3 contains 5 Keyboards

--4. Addresses
INSERT INTO Addresses (CartID, AddressLine1, AddressLine2, City, State, ZipCode)
VALUES 
(1, '123 Main St', 'Apt 4B', 'New York', 'NY', '10001'),
(2, '456 Oak St', NULL, 'San Francisco', 'CA', '94102'),
(3, '789 Pine St', 'Suite 500', 'Los Angeles', 'CA', '90001');

--5. Orders
INSERT INTO Orders (CartID, OrderDate, TotalAmount)
VALUES 
(1, GETDATE(), 3200.00), -- Order for Cart 1
(2, GETDATE(), 2400.00), -- Order for Cart 2
(3, GETDATE(), 600.00);  -- Order for Cart 3

 --reset primary id
 DBCC CHECKIDENT ('Products', RESEED, 4);
