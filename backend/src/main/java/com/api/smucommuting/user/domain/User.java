package com.api.smucommuting.user.domain;

import com.api.smucommuting.common.entity.BaseTimeEntity;
import lombok.*;

import javax.persistence.*;

@Getter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@Entity
@Table(name = "user")
public class User extends BaseTimeEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "oauth_id")
    private String oauthId;

    @Column(name = "email")
    private String email;

    @Column(name = "student_id")
    private Integer studentId;

    @Enumerated(EnumType.STRING)
    @Column(name = "social_login_provider")
    private SocialLoginProvider socialLoginProvider;

    @Enumerated(EnumType.STRING)
    @Column(name = "role")
    private Role role;

    public void signup(String email, int studentId, UserValidator userValidator) {
        userValidator.emailValidate(email);
        this.email = email;
        this.studentId = studentId;
    }
}
