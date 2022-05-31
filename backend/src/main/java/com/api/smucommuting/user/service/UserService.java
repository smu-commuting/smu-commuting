package com.api.smucommuting.user.service;

import com.api.smucommuting.common.exception.user.UserNotFoundException;
import com.api.smucommuting.mail.infra.CustomMailSender;
import com.api.smucommuting.user.domain.User;
import com.api.smucommuting.user.domain.UserValidator;
import com.api.smucommuting.user.domain.UserVerificationCode;
import com.api.smucommuting.user.domain.repository.UserRepository;
import com.api.smucommuting.user.dto.UserRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

@Service
@Transactional
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final UserVerificationCodeService userVerificationCodeService;
    private final UserValidator userValidator;
    private final CustomMailSender mailSender;

    public void signup(UserRequest.Signup request, User loginUser) {
        User findUser = userRepository.findById(loginUser.getId()).orElseThrow(UserNotFoundException::new);
        findUser.signup(request.getEmail(), request.getStudentId(), userValidator);
    }

    public void sendEmailCode(UserRequest.Email request, User user) {
        UserVerificationCode userVerificationCode = userVerificationCodeService.create(user);
        mailSender.mailSend(request.getEmail(), userVerificationCode);
    }

    @Transactional(readOnly = true)
    public void codeVerification(UserRequest.EmailVerification request, User user, LocalDateTime now) {
        userVerificationCodeService.validateCode(user, request.getCode(), now);
    }

    public void delete(User loginUser) {
        loginUser.quit(loginUser.getId());
        userRepository.delete(loginUser);
    }
}
