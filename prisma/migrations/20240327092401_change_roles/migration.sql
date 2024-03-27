-- Wrote this thing myself
ALTER TABLE `Users` DROP CONSTRAINT `Roles_FK`;
ALTER TABLE `Users` DROP COLUMN `RoleId`;

DROP TABLE `Roles`;

ALTER TABLE `Users` ADD COLUMN `Role` VARCHAR(32);