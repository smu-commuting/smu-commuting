package com.api.smucommuting.user.service;

import com.api.smucommuting.user.domain.ProfileImage;
import com.api.smucommuting.user.domain.repository.ProfileImageRepository;
import com.api.smucommuting.user.dto.ProfileImageResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ProfileImageService {
    private final ProfileImageRepository profileImageRepository;

    public List<ProfileImageResponse.GetList> getList() {
        List<ProfileImage> images = profileImageRepository.findAll();
        return ProfileImageResponse.GetList.listsOf(images);
    }
}
