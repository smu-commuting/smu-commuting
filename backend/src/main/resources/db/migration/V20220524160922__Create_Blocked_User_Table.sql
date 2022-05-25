DROP TABLE IF EXISTS `blocked_user`;

CREATE TABLE `blocked_user`
(
    `id`              BIGINT   NOT NULL AUTO_INCREMENT,
    `blocked_user_id` BIGINT   NOT NULL,
    `user_id`         BIGINT   NOT NULL,
    `created_at`      DATETIME NOT NULL,
    `updated_at`      DATETIME DEFAULT NULL,
    PRIMARY KEY (`id`)
);