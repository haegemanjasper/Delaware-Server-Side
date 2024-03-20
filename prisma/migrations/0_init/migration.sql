-- CreateTable
CREATE TABLE `Addresses` (
    `AddressId` INTEGER NOT NULL AUTO_INCREMENT,
    `Street` VARCHAR(150) NOT NULL,
    `ZipCode` INTEGER NOT NULL,
    `City` VARCHAR(30) NOT NULL,
    `Country` VARCHAR(30) NOT NULL,
    `CreatedAt` DATETIME(0) NOT NULL,
    `UpdatedAt` DATETIME(0) NOT NULL,
    `IsActive` BOOLEAN NOT NULL DEFAULT true,
    `Username` VARCHAR(20) NOT NULL,

    INDEX `Users_FK`(`Username`),
    PRIMARY KEY (`AddressId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE TRIGGER Addresses_Insert
    BEFORE INSERT ON Addresses
    FOR EACH ROW
BEGIN
    SET NEW.CreatedAt = NOW();
    SET NEW.UpdatedAt = NOW();
END;

CREATE TRIGGER Addresses_Update
    BEFORE UPDATE ON Addresses
    FOR EACH ROW
BEGIN
    SET NEW.UpdatedAt = NOW();
END;

-- CreateTable
CREATE TABLE `Addresses_Orders` (
    `AddressId` INTEGER NOT NULL,
    `OrderId` INTEGER NOT NULL,

    PRIMARY KEY (`AddressId`, `OrderId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Invoices` (
    `InvoiceId` INTEGER NOT NULL AUTO_INCREMENT,
    `InvoiceDate` DATE NOT NULL,
    `InvoiceAmount` FLOAT NOT NULL,
    `BankDetails` VARCHAR(255) NOT NULL,
    `CreatedAt` DATETIME(0) NOT NULL,
    `UpdatedAt` DATETIME(0) NOT NULL,
    `IsActive` BOOLEAN NOT NULL DEFAULT true,

    PRIMARY KEY (`InvoiceId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE TRIGGER Invoices_Insert
    BEFORE INSERT ON Invoices
    FOR EACH ROW
BEGIN
    SET NEW.CreatedAt = NOW();
    SET NEW.UpdatedAt = NOW();
END;

CREATE TRIGGER Invoices_Update
    BEFORE UPDATE ON Invoices
    FOR EACH ROW
BEGIN
    SET NEW.UpdatedAt = NOW();
END;

-- CreateTable
CREATE TABLE `Notifications` (
    `NotificationId` INTEGER NOT NULL AUTO_INCREMENT,
    `Date` DATE NOT NULL,
    `Text` TEXT NOT NULL,
    `Status` VARCHAR(20) NOT NULL,
    `CreatedAt` DATETIME(0) NOT NULL,
    `UpdatedAt` DATETIME(0) NOT NULL,
    `IsActive` BOOLEAN NOT NULL DEFAULT true,
    `Username` VARCHAR(20) NOT NULL,
    `OrderId` INTEGER NULL,

    INDEX `NotificationUsers_FK`(`Username`),
    INDEX `NotificationsOrders_FK`(`OrderId`),
    PRIMARY KEY (`NotificationId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE TRIGGER Notifications_Insert
    BEFORE INSERT ON Notifications
    FOR EACH ROW
BEGIN
    SET NEW.CreatedAt = NOW();
    SET NEW.UpdatedAt = NOW();
END;

CREATE TRIGGER Notifications_Update
    BEFORE UPDATE ON Notifications
    FOR EACH ROW
BEGIN
    SET NEW.UpdatedAt = NOW();
END;

-- CreateTable
CREATE TABLE `OrderLines` (
    `OrderLineId` INTEGER NOT NULL AUTO_INCREMENT,
    `Quantity` INTEGER NOT NULL,
    `CreatedAt` DATETIME(0) NOT NULL,
    `UpdatedAt` DATETIME(0) NOT NULL,
    `IsActive` BOOLEAN NOT NULL DEFAULT true,
    `OrderId` INTEGER NOT NULL,

    INDEX `Orders_FK`(`OrderId`),
    PRIMARY KEY (`OrderLineId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE TRIGGER OrderLines_Insert
    BEFORE INSERT ON OrderLines
    FOR EACH ROW
BEGIN
    SET NEW.CreatedAt = NOW();
    SET NEW.UpdatedAt = NOW();
END;

CREATE TRIGGER OrderLines_Update
    BEFORE UPDATE ON OrderLines
    FOR EACH ROW
BEGIN
    SET NEW.UpdatedAt = NOW();
END;

-- CreateTable
CREATE TABLE `OrderLines_Products` (
    `OrderLineId` INTEGER NOT NULL,
    `ProductId` INTEGER NOT NULL,

    PRIMARY KEY (`OrderLineId`, `ProductId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Orders` (
    `OrderId` INTEGER NOT NULL AUTO_INCREMENT,
    `OrderDate` DATE NOT NULL,
    `DeliveryDate` DATE NULL,
    `Status` VARCHAR(20) NOT NULL,
    `PaymentStatus` VARCHAR(20) NOT NULL,
    `OrderReference` VARCHAR(20) NULL,
    `NetAmount` FLOAT NOT NULL,
    `TaxAmount` FLOAT NOT NULL,
    `TotalAmount` FLOAT NOT NULL,
    `Currency` VARCHAR(10) NOT NULL,
    `CreatedAt` DATETIME(0) NOT NULL,
    `UpdatedAt` DATETIME(0) NOT NULL,
    `IsActive` BOOLEAN NOT NULL DEFAULT true,
    `Username` VARCHAR(20) NOT NULL,
    `InvoiceId` INTEGER NOT NULL,

    INDEX `OrderInvoices_FK`(`InvoiceId`),
    INDEX `OrderUsers_FK`(`Username`),
    PRIMARY KEY (`OrderId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE TRIGGER Orders_Insert
    BEFORE INSERT ON Orders
    FOR EACH ROW
BEGIN
    SET NEW.CreatedAt = NOW();
    SET NEW.UpdatedAt = NOW();
END;

CREATE TRIGGER Orders_Update
    BEFORE UPDATE ON Orders
    FOR EACH ROW
BEGIN
    SET NEW.UpdatedAt = NOW();
END;

-- CreateTable
CREATE TABLE `PaymentRequests` (
    `PaymentRequestId` INTEGER NOT NULL AUTO_INCREMENT,
    `PaymentRequestDate` DATE NOT NULL,
    `PaymentRequestAmount` FLOAT NOT NULL,
    `BankDetails` VARCHAR(255) NOT NULL,
    `OrderId` INTEGER NOT NULL,

    INDEX `PaymentRequestsOrders_FK`(`OrderId`),
    PRIMARY KEY (`PaymentRequestId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Payments` (
    `PaymentId` INTEGER NOT NULL AUTO_INCREMENT,
    `PaymentDate` DATE NOT NULL,
    `PaymentAmount` FLOAT NOT NULL,
    `PaymentMethod` INTEGER NOT NULL,
    `CreatedAt` DATETIME(0) NOT NULL,
    `UpdatedAt` DATETIME(0) NOT NULL,
    `IsActive` BOOLEAN NOT NULL DEFAULT true,
    `InvoiceId` INTEGER NOT NULL,

    INDEX `Invoices_FK`(`InvoiceId`),
    PRIMARY KEY (`PaymentId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE TRIGGER Payments_Insert
    BEFORE INSERT ON Payments
    FOR EACH ROW
BEGIN
    SET NEW.CreatedAt = NOW();
    SET NEW.UpdatedAt = NOW();
END;

CREATE TRIGGER Payments_Update
    BEFORE UPDATE ON Payments
    FOR EACH ROW
BEGIN
    SET NEW.UpdatedAt = NOW();
END;

-- CreateTable
CREATE TABLE `ProductTranslations` (
    `ProductTranslationId` INTEGER NOT NULL AUTO_INCREMENT,
    `Translation` VARCHAR(32) NOT NULL,
    `CreatedAt` DATETIME(0) NOT NULL,
    `UpdatedAt` DATETIME(0) NOT NULL,
    `IsActive` BOOLEAN NOT NULL DEFAULT true,
    `ProductId` INTEGER NOT NULL,

    INDEX `Products_FK`(`ProductId`),
    PRIMARY KEY (`ProductTranslationId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE TRIGGER ProductTranslations_Insert
    BEFORE INSERT ON ProductTranslations
    FOR EACH ROW
BEGIN
    SET NEW.CreatedAt = NOW();
    SET NEW.UpdatedAt = NOW();
END;

CREATE TRIGGER ProductTranslations_Update
    BEFORE UPDATE ON ProductTranslations
    FOR EACH ROW
BEGIN
    SET NEW.UpdatedAt = NOW();
END;

-- CreateTable
CREATE TABLE `Products` (
    `ProductId` INTEGER NOT NULL AUTO_INCREMENT,
    `Price` FLOAT NOT NULL,
    `Stock` INTEGER NOT NULL,
    `UnitOfMeasurement` VARCHAR(10) NOT NULL,
    `ProductCategory` INTEGER NOT NULL,
    `ProductAvailability` VARCHAR(10) NOT NULL,
    `CreatedAt` DATETIME(0) NOT NULL,
    `UpdatedAt` DATETIME(0) NOT NULL,
    `IsActive` BOOLEAN NOT NULL DEFAULT true,

    PRIMARY KEY (`ProductId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE TRIGGER Products_Insert
    BEFORE INSERT ON Products
    FOR EACH ROW
BEGIN
    SET NEW.CreatedAt = NOW();
    SET NEW.UpdatedAt = NOW();
END;

CREATE TRIGGER Products_Update
    BEFORE UPDATE ON Products
    FOR EACH ROW
BEGIN
    SET NEW.UpdatedAt = NOW();
END;

-- CreateTable
CREATE TABLE `Users` (
    `Username` VARCHAR(20) NOT NULL,
    `PasswordHash` VARCHAR(64) NOT NULL,
    `Email` VARCHAR(50) NOT NULL,
    `PhoneNr` VARCHAR(16) NOT NULL,
    `VatNr` VARCHAR(16) NOT NULL,
    `Name` VARCHAR(30) NOT NULL,
    `CreatedAt` DATETIME(0) NOT NULL,
    `UpdatedAt` DATETIME(0) NOT NULL,
    `IsActive` BOOLEAN NOT NULL DEFAULT true,

    UNIQUE INDEX `Email`(`Email`),
    UNIQUE INDEX `PhoneNr`(`PhoneNr`),
    UNIQUE INDEX `VatNr`(`VatNr`),
    PRIMARY KEY (`Username`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE TRIGGER Users_Insert
    BEFORE INSERT ON Users
    FOR EACH ROW
BEGIN
    SET NEW.CreatedAt = NOW();
    SET NEW.UpdatedAt = NOW();
END;

CREATE TRIGGER Users_Update
    BEFORE UPDATE ON Users
    FOR EACH ROW
BEGIN
    SET NEW.UpdatedAt = NOW();
END;

-- AddForeignKey
ALTER TABLE `Addresses` ADD CONSTRAINT `Users_FK` FOREIGN KEY (`Username`) REFERENCES `Users`(`Username`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `Notifications` ADD CONSTRAINT `NotificationUsers_FK` FOREIGN KEY (`Username`) REFERENCES `Users`(`Username`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `Notifications` ADD CONSTRAINT `NotificationsOrders_FK` FOREIGN KEY (`OrderId`) REFERENCES `Orders`(`OrderId`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `OrderLines` ADD CONSTRAINT `Orders_FK` FOREIGN KEY (`OrderId`) REFERENCES `Orders`(`OrderId`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `Orders` ADD CONSTRAINT `OrderInvoices_FK` FOREIGN KEY (`InvoiceId`) REFERENCES `Invoices`(`InvoiceId`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `Orders` ADD CONSTRAINT `OrderUsers_FK` FOREIGN KEY (`Username`) REFERENCES `Users`(`Username`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `PaymentRequests` ADD CONSTRAINT `PaymentRequestsOrders_FK` FOREIGN KEY (`OrderId`) REFERENCES `Orders`(`OrderId`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `Payments` ADD CONSTRAINT `Invoices_FK` FOREIGN KEY (`InvoiceId`) REFERENCES `Invoices`(`InvoiceId`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `ProductTranslations` ADD CONSTRAINT `Products_FK` FOREIGN KEY (`ProductId`) REFERENCES `Products`(`ProductId`) ON DELETE RESTRICT ON UPDATE RESTRICT;

