package com.api.smucommuting;

import com.api.smucommuting.auth.domain.oauth.CustomOAuth2UserService;
import com.api.smucommuting.auth.domain.oauth.OAuth2SuccessHandler;
import com.api.smucommuting.auth.domain.security.CustomUserDetailsService;
import com.api.smucommuting.auth.domain.token.JwtAuthEntryPoint;
import com.api.smucommuting.auth.domain.token.JwtProps;
import com.api.smucommuting.auth.domain.token.TokenProvider;
import com.api.smucommuting.common.config.WebMvcConfig;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.restdocs.AutoConfigureRestDocs;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Import;
import org.springframework.test.web.servlet.MockMvc;

@AutoConfigureRestDocs
@Import({
        WebMvcConfig.class,
        TokenProvider.class,
        JwtProps.class,
        RestDocsConfig.class,
})
@WithMockCustomUser
public abstract class MvcTest {
    @Autowired
    protected MockMvc mvc;
    @Autowired
    protected ObjectMapper objectMapper;
    @MockBean
    protected CustomUserDetailsService customUserDetailsService;
    @MockBean
    protected JwtAuthEntryPoint jwtAuthEntryPoint;
    @MockBean
    protected OAuth2SuccessHandler oAuth2SuccessHandler;
    @MockBean
    protected CustomOAuth2UserService customOAuth2UserService;
}
