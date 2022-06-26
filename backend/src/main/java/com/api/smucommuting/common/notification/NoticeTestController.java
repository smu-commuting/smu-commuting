package com.api.smucommuting.common.notification;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class NoticeTestController {
    private final FirebaseCloudMessageService firebaseCloudMessageService;

    @PostMapping("/test")
    public void test(@RequestBody NoticeTestDto noticeTestDto) throws IOException {
        firebaseCloudMessageService.sendMessageTo(noticeTestDto.getToken(), noticeTestDto.getTitle(), noticeTestDto.getBody());
    }
}
