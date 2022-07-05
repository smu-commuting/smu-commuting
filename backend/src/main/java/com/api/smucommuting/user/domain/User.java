package com.api.smucommuting.user.domain;

import com.api.smucommuting.common.entity.BaseTimeEntity;
import com.api.smucommuting.common.event.Events;
import com.api.smucommuting.user.domain.event.UserDeletedEvent;
import lombok.*;

import javax.persistence.*;
import java.util.Objects;

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

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "profile_image_id")
    private ProfileImage profileImage;

    public void signup(String email, int studentId, ProfileImage profileImage, UserValidator userValidator) {
        userValidator.emailValidate(email);
        this.email = email;
        this.studentId = studentId;
        this.profileImage = profileImage;
    }

    public void quit(Long userId) {
        Events.raise(new UserDeletedEvent(userId));
    }

    public void update(ProfileImage profileImage) {
        this.profileImage = profileImage;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        User user = (User) o;
        return getId().equals(user.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hash(getId());
    }
}
