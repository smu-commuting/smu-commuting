package com.api.smucommuting.user.domain;

import lombok.*;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.Random;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@Entity
@Table(name = "user_verification_code")
public class UserVerificationCode {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "email_code")
    private String emailCode;

    @Column(name = "expiration_date")
    private LocalDateTime expirationDate;

    @Column(name = "fcm_token")
    private String fcmToken;

    @OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.REMOVE)
    @JoinColumn(name = "user_id")
    private User user;

    public UserVerificationCode update(UserVerificationCode userVerificationCode) {
        this.emailCode = userVerificationCode.getEmailCode();
        this.expirationDate = userVerificationCode.getExpirationDate();
        return this;
    }

    public void update(String fcmToken) {
        this.fcmToken = fcmToken;
    }

    public static UserVerificationCode create(User user) {
        String code = createCode();

        return UserVerificationCode.builder()
                .emailCode(code)
                .user(user)
                .expirationDate(LocalDateTime.now().plusMinutes(5))
                .build();
    }

    private static String createCode() {
        StringBuilder code = new StringBuilder();
        Random random = new Random();
        for (int i = 0; i < 6; i++) {
            code.append((random.nextInt(10)));
        }
        return code.toString();
    }

    public static UserVerificationCode createFcm(String fcmToken, User user) {
        return UserVerificationCode.builder()
                .fcmToken(fcmToken)
                .user(user)
                .build();
    }
}
