package dev.rodrigojose.minder.application.usecases.file;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import dev.rodrigojose.minder.adapters.outbound.repositories.NodeRepositoryImpl;
import dev.rodrigojose.minder.domain.node.Node;
import dev.rodrigojose.minder.infrastructure.config.exceptions.NodeNotFoundException;

@Service
public class DeleteByIdFile {
  @Autowired
  private NodeRepositoryImpl repository;

  @Autowired
  private DeleteUploadedImageFile deleteUploadedImageFile;

  @Value("${minder.workspace:./.minder/nodes}")
  private String workspace;

  public void execute(UUID id) throws IOException {
    Node node = repository.findById(id);
    if (node == null) {
      throw new NodeNotFoundException("Node not found in File delete!");
    }

    if (node.getFile() == null || node.getFile().isEmpty()) {
      throw new IOException("This Node dont had file associated!");
    }

    Path path = Paths.get(workspace).resolve(node.getFile());

    if (Files.exists(path)) {
      String content = Files.readString(path);
      deleteUploadedImageFile.executeFromMarkdown(content);
      Files.delete(path);
    }
  }
}
