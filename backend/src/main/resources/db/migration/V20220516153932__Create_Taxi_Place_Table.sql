DROP TABLE IF EXISTS `taxi_place`;

CREATE TABLE `taxi_place`
(
    `id`   BIGINT      NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(20) NOT NULL,
    PRIMARY KEY (`id`)
);

INSERT INTO `taxi_place` (name)
VALUES ('홍제역'),
       ('경복궁역'),
       ('남영역'),
       ('시청역'),
       ('서울역'),
       ('KT 광화문지사')