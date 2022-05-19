DROP TABLE IF EXISTS `message`;

CREATE TABLE `message`
(
    `message_id`   BIGINT       NOT NULL AUTO_INCREMENT,
    `chat_room_id` BIGINT       NOT NULL,
    `user_id`      BIGINT       NOT NULL,
    `content`      VARCHAR(255) NOT NULL,
    `created_at`   DATETIME     NOT NULL,
    `updated_at`   DATETIME DEFAULT NULL,
    PRIMARY KEY (`message_id`)
);