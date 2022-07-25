DROP TABLE IF EXISTS `bus_open_chat`;

CREATE TABLE `bus_open_chat`
(
    `id`   BIGINT       NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(100) NOT NULL,
    PRIMARY KEY (`id`)
);

INSERT INTO `bus_open_chat` (name)
VALUES ('7016'),
       ('서대문08')