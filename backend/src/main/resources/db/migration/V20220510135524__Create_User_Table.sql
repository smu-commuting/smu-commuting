DROP TABLE IF EXISTS `user`;

CREATE TABLE `user`
(
    `id`         BIGINT      NOT NULL AUTO_INCREMENT,
    `oauth_id`   VARCHAR(50) NOT NULL,
    `email`      VARCHAR(100),
    `student_id` INT,
    `social_login_provider`   VARCHAR(30) NOT NULL,
    `role`       VARCHAR(20) NOT NULL,
    `created_at` DATETIME    NOT NULL,
    `updated_at` DATETIME DEFAULT NULL,
    PRIMARY KEY (`id`)
);