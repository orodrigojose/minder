package dev.rodrigojose.minder.application.usecases.file;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public class UploadImageFile {
  @Value("${app.upload.dir:./.minder/uploads/}")
  private String uploadDir;

  public UploadImageFile() {
  }

  public String execute(MultipartFile file) throws IOException {
    if (file == null || file.isEmpty()) {
      throw new IllegalArgumentException("File is required");
    }

    String contentType = file.getContentType();
    if (contentType == null || !contentType.startsWith("image/")) {
      throw new IllegalArgumentException("Only image files are allowed");
    }

    Path uploadPath = Paths.get(uploadDir).toAbsolutePath().normalize();
    Files.createDirectories(uploadPath);

    String originalFileName = file.getOriginalFilename();
    String extension = "";
    if (originalFileName != null && originalFileName.contains(".")) {
      extension = originalFileName.substring(originalFileName.lastIndexOf('.'));
    }

    String storedFileName = UUID.randomUUID() + extension;
    Path destination = uploadPath.resolve(storedFileName);

    file.transferTo(destination);
    return storedFileName;
  }
}