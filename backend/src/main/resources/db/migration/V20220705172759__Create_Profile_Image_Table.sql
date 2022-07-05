DROP TABLE IF EXISTS `profile_image`;

CREATE TABLE `profile_image`
(
    `id`  BIGINT        NOT NULL AUTO_INCREMENT,
    `url` VARCHAR(2083) NOT NULL,
    PRIMARY KEY (`id`)
);

INSERT INTO `profile_image` (url)
VALUES ('https://s3.ap-northeast-2.amazonaws.com/s3.smulo.site.postfile/%EA%B2%80%EC%83%89.png'),
       ('https://s3.ap-northeast-2.amazonaws.com/s3.smulo.site.postfile/%EA%B3%B5%EC%A7%80.png'),
       ('https://s3.ap-northeast-2.amazonaws.com/s3.smulo.site.postfile/%EA%B8%B0%EB%B3%B8%ED%98%95-%EC%9D%B4%EB%AF%B8%EC%A7%80(%EA%B3%BC%EC%9E%A0%EC%88%98%EB%AD%89%EC%9D%B4-%EC%A0%95%EB%A9%B4).png'),
       ('https://s3.ap-northeast-2.amazonaws.com/s3.smulo.site.postfile/%EA%B8%B0%EB%B3%B8%ED%98%95-%EC%9D%B4%EB%AF%B8%EC%A7%80(%EC%8A%A4%EC%B9%B4%ED%94%84%EC%88%98%EB%AD%89%EC%9D%B4-%EC%A0%95%EB%A9%B4).png'),
       ('https://s3.ap-northeast-2.amazonaws.com/s3.smulo.site.postfile/%EB%A7%88%EC%8A%A4%ED%81%AC.png'),
       ('https://s3.ap-northeast-2.amazonaws.com/s3.smulo.site.postfile/%EB%A9%94%EB%AA%A8.png'),
       ('https://s3.ap-northeast-2.amazonaws.com/s3.smulo.site.postfile/%EB%AC%B8%EC%A0%9C%EC%A0%9C%EC%8B%9C.png'),
       ('https://s3.ap-northeast-2.amazonaws.com/s3.smulo.site.postfile/%EB%B6%80%EB%81%84.png'),
       ('https://s3.ap-northeast-2.amazonaws.com/s3.smulo.site.postfile/%EB%B8%8C%EC%9D%B4.jpg'),
       ('https://s3.ap-northeast-2.amazonaws.com/s3.smulo.site.postfile/%EB%B8%8C%EC%9D%B42.jpg'),
       ('https://s3.ap-northeast-2.amazonaws.com/s3.smulo.site.postfile/%EC%83%A4%EB%B0%A9.jpg'),
       ('https://s3.ap-northeast-2.amazonaws.com/s3.smulo.site.postfile/%EC%86%8C%EA%B0%9C.png'),
       ('https://s3.ap-northeast-2.amazonaws.com/s3.smulo.site.postfile/%EC%8B%9C%ED%97%98.png'),
       ('https://s3.ap-northeast-2.amazonaws.com/s3.smulo.site.postfile/%EC%95%88%EB%85%95.png'),
       ('https://s3.ap-northeast-2.amazonaws.com/s3.smulo.site.postfile/%EC%97%B0%EC%84%A4.png'),
       ('https://s3.ap-northeast-2.amazonaws.com/s3.smulo.site.postfile/%EC%9D%BC%EC%A0%95%ED%99%95%EC%9D%B8.png'),
       ('https://s3.ap-northeast-2.amazonaws.com/s3.smulo.site.postfile/%EC%A1%B8%EC%97%85.png'),
       ('https://s3.ap-northeast-2.amazonaws.com/s3.smulo.site.postfile/%EC%B6%95%ED%95%98.png'),
       ('https://s3.ap-northeast-2.amazonaws.com/s3.smulo.site.postfile/%ED%83%90%EA%B5%AC.png'),
       ('https://s3.ap-northeast-2.amazonaws.com/s3.smulo.site.postfile/%ED%95%99%EC%82%AC%EC%9D%BC%EC%A0%95%EC%9D%91%EC%9A%A9%EC%9D%B4%EB%AF%B8%EC%A7%801.png'),
       ('https://s3.ap-northeast-2.amazonaws.com/s3.smulo.site.postfile/%ED%95%99%EC%82%AC%EC%9D%BC%EC%A0%95%EC%9D%91%EC%9A%A9%EC%9D%B4%EB%AF%B8%EC%A7%802.png'),
       ('https://s3.ap-northeast-2.amazonaws.com/s3.smulo.site.postfile/%ED%95%99%EC%82%AC%EC%9D%BC%EC%A0%95%EC%9D%91%EC%9A%A9%EC%9D%B4%EB%AF%B8%EC%A7%803.png'),
       ('https://s3.ap-northeast-2.amazonaws.com/s3.smulo.site.postfile/%ED%95%99%EC%82%AC%EC%9D%BC%EC%A0%95%EC%9D%91%EC%9A%A9%EC%9D%B4%EB%AF%B8%EC%A7%804.png'),
       ('https://s3.ap-northeast-2.amazonaws.com/s3.smulo.site.postfile/%ED%99%94%EC%9D%B4%ED%8C%85.png')