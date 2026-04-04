package dev.rodrigojose.minder.application.usecases.file;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import dev.rodrigojose.minder.infrastructure.config.exceptions.NodeNotFoundException;

@Service
public class CreateFile {
  @Value("${minder.workspace:uploads}")
  private String workspace;

  public void execute(String content, String fileName) throws NodeNotFoundException, IOException, RuntimeException {
    Path path = Paths.get(workspace + "/" + fileName);

    Files.createDirectories(path.getParent());
    Files.writeString(path, content);
  }
}
