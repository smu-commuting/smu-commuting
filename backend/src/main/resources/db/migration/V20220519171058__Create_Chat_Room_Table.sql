DROP TABLE IF EXISTS `chat_room`;

CREATE TABLE `chat_room`
(
    `chat_room_id` BIGINT   NOT NULL AUTO_INCREMENT,
    `created_at`   DATETIME NOT NULL,
    `updated_at`   DATETIME DEFAULT NULL,
    PRIMARY KEY (`chat_room_id`)
);