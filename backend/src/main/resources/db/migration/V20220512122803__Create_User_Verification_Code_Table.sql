DROP TABLE IF EXISTS `user_verification_code`;

CREATE TABLE `user_verification_code`
(
    `id`              BIGINT      NOT NULL AUTO_INCREMENT,
    `user_id`         BIGINT      NOT NULL,
    `code`            VARCHAR(20) NOT NULL,
    `expiration_date` DATETIME    NOT NULL,
    PRIMARY KEY (`id`)
);