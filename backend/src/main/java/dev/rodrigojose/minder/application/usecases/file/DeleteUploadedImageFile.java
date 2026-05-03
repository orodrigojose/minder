package dev.rodrigojose.minder.application.usecases.file;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.LinkedHashSet;
import java.util.Set;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class DeleteUploadedImageFile {
  private static final Pattern MARKDOWN_IMAGE_PATTERN = Pattern.compile("!\\[[^\\]]*\\]\\(([^)]+)\\)");

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

  public void executeFromMarkdown(String markdownContent) throws IOException {
    if (markdownContent == null || markdownContent.isBlank()) {
      return;
    }

    Set<String> fileNames = new LinkedHashSet<>();
    Matcher matcher = MARKDOWN_IMAGE_PATTERN.matcher(markdownContent);

    while (matcher.find()) {
      String url = matcher.group(1);
      String fileName = extractUploadFileName(url);

      if (fileName != null) {
        fileNames.add(fileName);
      }
    }

    for (String fileName : fileNames) {
      execute(fileName);
    }
  }

  private String extractUploadFileName(String url) {
    try {
      String normalizedUrl = url == null ? "" : url.trim();
      if (normalizedUrl.isEmpty()) {
        return null;
      }

      java.net.URI uri = java.net.URI.create(normalizedUrl);
      String pathValue = uri.getPath();

      if (pathValue == null || !pathValue.startsWith("/uploads/")) {
        return null;
      }

      return Paths.get(pathValue).getFileName().toString();
    } catch (Exception ignored) {
      return null;
    }
  }
}