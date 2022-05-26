DROP TABLE IF EXISTS `taxi_group`;

CREATE TABLE `taxi_group`
(
    `id`            BIGINT      NOT NULL AUTO_INCREMENT,
    `taxi_party_id` BIGINT      NOT NULL,
    `user_id`       BIGINT      NOT NULL,
    `status`        VARCHAR(20) NOT NULL,
    `created_at`    DATETIME    NOT NULL,
    `updated_at`    DATETIME DEFAULT NULL,
    PRIMARY KEY (`id`)
);