package dev.rodrigojose.minder.application.usecases.file;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.nio.file.Path;
import java.util.UUID;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import dev.rodrigojose.minder.adapters.outbound.repositories.NodeRepositoryImpl;
import dev.rodrigojose.minder.infrastructure.config.exceptions.NodeNotFoundException;

@Service
public class FindByIdFile {
  @Autowired
  private NodeRepositoryImpl repository;

  public String execute(UUID id) throws IOException {
    var node = repository.findById(id);

    if (node == null) {
      throw new NodeNotFoundException("Node of file doesnt exists!");
    }

    Path path = Paths.get("uploads/" + node.getFile());

    String content = new String(Files.readAllBytes(path), StandardCharsets.UTF_8);
    return content;
  }
}
