DROP TABLE IF EXISTS `user_verification_code`;

CREATE TABLE `user_verification_code`
(
    `id`              BIGINT NOT NULL AUTO_INCREMENT,
    `user_id`         BIGINT NOT NULL,
    `email_code`      VARCHAR(20),
    `fcm_token`       VARCHAR(150),
    `expiration_date` DATETIME,
    PRIMARY KEY (`id`)
);