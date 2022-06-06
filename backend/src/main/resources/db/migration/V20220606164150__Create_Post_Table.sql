DROP TABLE IF EXISTS `post`;

CREATE TABLE `post`
(
    `id`         BIGINT       NOT NULL AUTO_INCREMENT,
    `user_id`    BIGINT       NOT NULL,
    `content`    VARCHAR(255),
    `place`      VARCHAR(255) NOT NULL,
    `item`       VARCHAR(50)  NOT NULL,
    `obtain_date` DATETIME     NOT NULL,
    `created_at` DATETIME     NOT NULL,
    `updated_at` DATETIME DEFAULT NULL,
    PRIMARY KEY (`id`)
);