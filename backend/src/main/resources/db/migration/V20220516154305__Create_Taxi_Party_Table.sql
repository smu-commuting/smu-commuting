DROP TABLE IF EXISTS `taxi_party`;

CREATE TABLE `taxi_party`
(
    `id`            BIGINT   NOT NULL AUTO_INCREMENT,
    `taxi_place_id` BIGINT   NOT NULL,
    `headcount`     INT      NOT NULL,
    `meeting_time`  DATETIME NOT NULL,
    `created_at`    DATETIME NOT NULL,
    `updated_at`    DATETIME DEFAULT NULL,
    PRIMARY KEY (`id`)
);