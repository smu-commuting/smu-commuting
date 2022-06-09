DROP TABLE IF EXISTS `post_reply`;

CREATE TABLE `post_reply`
(
    `id`         BIGINT       NOT NULL AUTO_INCREMENT,
    `user_id`    BIGINT       NOT NULL,
    `post_id`    BIGINT       NOT NULL,
    `content`    VARCHAR(255) NOT NULL,
    `created_at` DATETIME     NOT NULL,
    `updated_at` DATETIME DEFAULT NULL,
    PRIMARY KEY (`id`)
);