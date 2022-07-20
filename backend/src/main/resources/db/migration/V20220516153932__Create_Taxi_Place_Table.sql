DROP TABLE IF EXISTS `taxi_place`;

CREATE TABLE `taxi_place`
(
    `id`   BIGINT      NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(20) NOT NULL,
    PRIMARY KEY (`id`)
);

INSERT INTO `taxi_place` (name)
VALUES ('경복궁역'),
       ('남영역'),
       ('시청역'),
       ('서울역'),
       ('KT 광화문지사'),
       ('홍제역'),
       ('유진상가'),
       ('서울여자간호대학교')