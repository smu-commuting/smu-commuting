package com.api.smucommuting.common.config;

import com.api.smucommuting.auth.oauth.handler.OAuth2SuccessHandler;
import com.api.smucommuting.auth.oauth.service.CustomOAuth2UserService;
import com.api.smucommuting.auth.security.service.CustomUserDetailsService;
import com.api.smucommuting.auth.token.domain.JwtAuthEntryPoint;
import com.api.smucommuting.auth.token.domain.JwtTokenAuthenticationFilter;
import com.api.smucommuting.auth.token.service.TokenProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.oauth2.client.web.OAuth2LoginAuthenticationFilter;

@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig extends WebSecurityConfigurerAdapter {
    private final TokenProvider tokenProvider;
    private final CustomUserDetailsService customUserDetailsService;
    private final JwtAuthEntryPoint jwtAuthEntryPoint;
    private final OAuth2SuccessHandler oAuth2SuccessHandler;
    private final CustomOAuth2UserService customOAuth2UserService;

    @Bean
    public JwtTokenAuthenticationFilter tokenAuthenticationFilter() {
        return new JwtTokenAuthenticationFilter(tokenProvider, customUserDetailsService);
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.cors()
                .and()
                .headers().frameOptions().disable()
                .and()
                .httpBasic().disable()
                .formLogin().disable()
                .rememberMe().disable()
                .csrf().disable()
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                .exceptionHandling().authenticationEntryPoint(jwtAuthEntryPoint)
                .and()
                .authorizeRequests()
                .antMatchers("/docs/**").permitAll()
                .anyRequest().authenticated()
                .and()
                .oauth2Login()
                .userInfoEndpoint()
                .userService(customOAuth2UserService)
                .and()
                .successHandler(oAuth2SuccessHandler)
                .and()
                .addFilterBefore(tokenAuthenticationFilter(), OAuth2LoginAuthenticationFilter.class);
    }
}
