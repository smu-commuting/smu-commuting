DROP TABLE IF EXISTS `bus_open_chat_message`;

CREATE TABLE `bus_open_chat_message`
(
    `id`                BIGINT       NOT NULL AUTO_INCREMENT,
    `sender_id`         BIGINT       NOT NULL,
    `bus_open_chat_id`  BIGINT       NOT NULL,
    `sender_student_id` INT          NOT NULL,
    `content`           VARCHAR(255) NOT NULL,
    `created_at`        DATETIME     NOT NULL,
    `updated_at`        DATETIME DEFAULT NULL,
    PRIMARY KEY (`id`)
);