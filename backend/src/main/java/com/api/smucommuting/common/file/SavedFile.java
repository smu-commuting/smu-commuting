package com.api.smucommuting.common.file;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
@AllArgsConstructor
public class SavedFile {
    private final String name;
    private final String extension;
    private final Long size;
    private final String publicUrl;
    private final Integer width;
    private final Integer height;

    private final FileType fileType;
    private final FileServer fileServer;

    public static SavedFile create(String s3FileName, String extension, FileServer fileServer, long fileSize, FileType fileType, String publicUrl, Integer width, Integer height) {
        return SavedFile.builder()
                .name(s3FileName)
                .extension(extension)
                .fileServer(fileServer)
                .size(fileSize)
                .publicUrl(publicUrl)
                .width(width)
                .height(height)
                .fileServer(fileServer)
                .fileType(fileType)
                .build();
    }
}
