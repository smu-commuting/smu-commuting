package com.api.smucommuting.auth.domain.oauth;

import com.api.smucommuting.auth.domain.token.Token;
import com.api.smucommuting.auth.domain.token.TokenProvider;
import com.api.smucommuting.common.exception.user.UserNotFoundException;
import com.api.smucommuting.user.domain.SocialLoginProvider;
import com.api.smucommuting.user.domain.User;
import com.api.smucommuting.user.domain.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Component
@RequiredArgsConstructor
public class OAuth2SuccessHandler implements AuthenticationSuccessHandler {
    private final TokenProvider tokenProvider;
    private final UserRepository userRepository;
    @Value("${oauth2.success.redirect.url}")
    private String url;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException {
        OAuth2User oauth2User = (OAuth2User) authentication.getPrincipal();
        User user = findUser(oauth2User);

        Token token = tokenProvider.generateAccessToken(user);

        response.sendRedirect(createCallback(user, token));
    }

    private String createCallback(User user, Token token) {
        return url + user.getId() + "/" + token.getToken() + "/" + user.getStudentId();
    }

    private User findUser(OAuth2User oauth2User) {
        if (oauth2User.getAttributes().get("sub") != null) {
            String oAuthId = String.valueOf(oauth2User.getAttributes().get("sub"));
            return userRepository.findBySocialLoginProviderAndOauthId(SocialLoginProvider.GOOGLE, oAuthId).orElseThrow(UserNotFoundException::new);
        } else {
            String oAuthId = String.valueOf(oauth2User.getAttributes().get("id"));
            return userRepository.findBySocialLoginProviderAndOauthId(SocialLoginProvider.KAKAO, oAuthId).orElseThrow(UserNotFoundException::new);
        }
    }
}
