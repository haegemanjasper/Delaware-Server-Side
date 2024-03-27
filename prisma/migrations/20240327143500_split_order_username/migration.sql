ALTER TABLE `Orders` CHANGE `Username` `BuyerUsername` VARCHAR(20);
ALTER TABLE `Orders` ADD COLUMN `SellerUsername` VARCHAR(20);