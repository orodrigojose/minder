package dev.rodrigojose.minder.application.usecases.file;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class DeleteUploadedImageFile {
  @Value("${app.upload.dir:./.minder/uploads/}")
  private String uploadDir;

  public void execute(String fileName) throws IOException {
    if (fileName == null || fileName.isBlank()) {
      throw new IOException("File name is required");
    }

    Path uploadPath = Paths.get(uploadDir).toAbsolutePath().normalize();
    Path filePath = uploadPath.resolve(fileName).normalize();

    if (!filePath.startsWith(uploadPath)) {
      throw new IOException("Invalid file name");
    }

    if (Files.exists(filePath)) {
      Files.delete(filePath);
    }
  }
}