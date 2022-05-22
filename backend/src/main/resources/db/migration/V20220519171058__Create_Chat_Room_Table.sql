DROP TABLE IF EXISTS `chat_room`;

CREATE TABLE `chat_room`
(
    `chat_room_id` BIGINT      NOT NULL AUTO_INCREMENT,
    `taxi_party_id` BIGINT      NOT NULL,
    `place`        VARCHAR(20) NOT NULL,
    `maximum`      INT         NOT NULL,
    `meeting_time` DATETIME    NOT NULL,
    `created_at`   DATETIME    NOT NULL,
    `updated_at`   DATETIME DEFAULT NULL,
    PRIMARY KEY (`chat_room_id`)
);