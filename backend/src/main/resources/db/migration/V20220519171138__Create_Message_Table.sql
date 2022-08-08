DROP TABLE IF EXISTS `taxi_message`;

CREATE TABLE `taxi_message`
(
    `taxi_message_id`   BIGINT       NOT NULL AUTO_INCREMENT,
    `taxi_party_id`     BIGINT       NOT NULL,
    `sender_id`         BIGINT       NOT NULL,
    `sender_student_id` VARCHAR(100) NOT NULL,
    `content`           VARCHAR(255) NOT NULL,
    `created_at`        DATETIME     NOT NULL,
    `updated_at`        DATETIME DEFAULT NULL,
    PRIMARY KEY (`taxi_message_id`)
);