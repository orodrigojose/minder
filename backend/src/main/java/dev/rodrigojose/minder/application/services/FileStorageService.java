
package dev.rodrigojose.minder.application.services;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import dev.rodrigojose.minder.adapters.outbound.repositories.NodeRepository;
import dev.rodrigojose.minder.infrastructure.config.exceptions.NodeNotFoundException;

@Service
public class FileStorageService {
  @Autowired
  NodeRepository nodeRepository;

  public String findById(UUID id, String file) throws IOException {
    var node = nodeRepository.findById(id);
    Path path = Paths.get("uploads/" + file);

    String content = new String(Files.readAllBytes(path), StandardCharsets.UTF_8);
    return content;
  }

  public void create(String content, String fileName) throws NodeNotFoundException, IOException, RuntimeException {
    Path path = Paths.get("uploads/" + fileName);

    Files.createDirectories(path.getParent());
    Files.writeString(path, content);
  }

  public void delete(UUID id) throws IOException {
    var nodeOptional = nodeRepository.findById(id);
    if (nodeOptional.isPresent()) {
      var node = nodeOptional.get();
      Path path = Paths.get("uploads/" + node.getFile());
      Files.delete(path);
    }
  }
}