package dev.rodrigojose.minder.application.usecases.file;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.UUID;
import java.nio.file.Path;
import java.nio.file.StandardOpenOption;

import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;

import dev.rodrigojose.minder.adapters.outbound.repositories.NodeRepositoryImpl;
import dev.rodrigojose.minder.domain.node.Node;
import dev.rodrigojose.minder.infrastructure.config.exceptions.NodeNotFoundException;

@Service
public class UpdateFile {
  @Autowired
  private NodeRepositoryImpl repository;

  public void execute(UUID id, String data) throws IOException {
    Node node = repository.findById(id);

    if (node == null) {
      throw new NodeNotFoundException("Node not exists!");
    }

    Path path = Paths.get("uploads/" + node.getFile());
    Files.writeString(path, data, StandardOpenOption.CREATE, StandardOpenOption.TRUNCATE_EXISTING);
  }

}
