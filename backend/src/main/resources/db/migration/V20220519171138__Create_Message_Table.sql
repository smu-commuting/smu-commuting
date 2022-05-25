DROP TABLE IF EXISTS `message`;

CREATE TABLE `message`
(
    `message_id`        BIGINT       NOT NULL AUTO_INCREMENT,
    `chat_room_id`      BIGINT       NOT NULL,
    `sender_id`         BIGINT       NOT NULL,
    `sender_student_id` INT          NOT NULL,
    `content`           VARCHAR(255) NOT NULL,
    `created_at`        DATETIME     NOT NULL,
    `updated_at`        DATETIME DEFAULT NULL,
    PRIMARY KEY (`message_id`)
);