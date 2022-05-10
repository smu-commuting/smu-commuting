package com.api.smucommuting.auth.oauth.domain;

import com.api.smucommuting.user.domain.Role;
import com.api.smucommuting.user.domain.SocialLoginProvider;
import com.api.smucommuting.user.domain.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.Map;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class OAuthAttributes {
    private Map<String, Object> attributes;
    private String nameAttributeKey;
    private String oauthId;
    private SocialLoginProvider provider;

    public static OAuthAttributes of(String registrationId, String userNameAttributeName, Map<String, Object> attributes) {
        if ("google".equals(registrationId)) {
            return ofGoogle(userNameAttributeName, attributes);
        }
        if ("kakao".equals(registrationId)) {
            return ofKakao(attributes);
        }
        throw new IllegalArgumentException("올바르지 않은 소셜 로그인 방법입니다!");
    }

    private static OAuthAttributes ofGoogle(String userNameAttributeName, Map<String, Object> attributes) {
        return OAuthAttributes.builder()
                .oauthId((String) attributes.get(userNameAttributeName))
                .provider(SocialLoginProvider.GOOGLE)
                .attributes(attributes)
                .nameAttributeKey(userNameAttributeName)
                .build();
    }

    private static OAuthAttributes ofKakao(Map<String, Object> attributes) {
        return OAuthAttributes.builder()
                .oauthId(String.valueOf(attributes.get("id")))
                .provider(SocialLoginProvider.KAKAO)
                .attributes(attributes)
                .nameAttributeKey("id")
                .build();
    }

    public User toEntity() {
        return User.builder()
                .oauthId(oauthId)
                .role(Role.USER)
                .socialLoginProvider(provider)
                .build();
    }
}
