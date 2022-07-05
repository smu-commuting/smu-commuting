package com.api.smucommuting.user.service;

import com.api.smucommuting.common.exception.user.ProfileImageNotFoundException;
import com.api.smucommuting.common.exception.user.UserNotFoundException;
import com.api.smucommuting.common.mail.infra.CustomMailSender;
import com.api.smucommuting.user.domain.ProfileImage;
import com.api.smucommuting.user.domain.User;
import com.api.smucommuting.user.domain.UserValidator;
import com.api.smucommuting.user.domain.UserVerificationCode;
import com.api.smucommuting.user.domain.repository.ProfileImageRepository;
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
    private final ProfileImageRepository profileImageRepository;

    public void signup(UserRequest.Signup request, User loginUser) {
        User findUser = userRepository.findById(loginUser.getId()).orElseThrow(UserNotFoundException::new);
        ProfileImage profileImage = profileImageRepository.findById(request.getImageId()).orElseThrow(ProfileImageNotFoundException::new);
        findUser.signup(request.getEmail(), request.getStudentId(), profileImage, userValidator);
    }

    public void sendEmailCode(UserRequest.Email request, User loginUser) {
        UserVerificationCode userVerificationCode = userVerificationCodeService.create(loginUser);
        mailSender.mailSend(request.getEmail(), userVerificationCode);
    }

    public void update(UserRequest.Update request, User loginUser) {
        User user = userRepository.findById(loginUser.getId()).orElseThrow(UserNotFoundException::new);
        ProfileImage profileImage = profileImageRepository.findById(request.getImageId()).orElseThrow(ProfileImageNotFoundException::new);
        user.update(profileImage);
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
