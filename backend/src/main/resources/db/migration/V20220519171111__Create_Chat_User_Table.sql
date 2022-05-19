DROP TABLE IF EXISTS `chat_user`;

CREATE TABLE `chat_user`
(
    `chat_user_id` BIGINT   NOT NULL AUTO_INCREMENT,
    `chat_room_id` BIGINT   NOT NULL,
    `user_id`      BIGINT   NOT NULL,
    `created_at`   DATETIME NOT NULL,
    `updated_at`   DATETIME DEFAULT NULL,
    PRIMARY KEY (`chat_user_id`)
);