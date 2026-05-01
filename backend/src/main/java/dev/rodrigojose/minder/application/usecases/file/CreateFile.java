package dev.rodrigojose.minder.application.usecases.file;

import java.io.IOException;
import java.nio.file.FileAlreadyExistsException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class CreateFile {
  @Value("${minder.workspace:./.minder/nodes}")
  private String workspace;

  public CreateFile(String workspace) {
    this.workspace = workspace;
  }

  public CreateFile() {
  }

  public void execute(String content, String fileName) throws IOException {
    Path path = Paths.get(workspace).resolve(fileName);

    if (Files.exists(path)) {
      throw new FileAlreadyExistsException(path.toString());
    }

    Files.createDirectories(path.getParent());
    Files.writeString(path, content);
  }
}
