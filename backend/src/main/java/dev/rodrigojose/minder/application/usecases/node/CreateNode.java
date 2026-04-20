package dev.rodrigojose.minder.application.usecases.node;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import dev.rodrigojose.minder.adapters.outbound.repositories.NodeRepositoryImpl;
import dev.rodrigojose.minder.application.usecases.file.CreateFile;
import dev.rodrigojose.minder.domain.node.Node;
import dev.rodrigojose.minder.infrastructure.config.exceptions.NodeNotFoundException;

@Service
public class CreateNode {
  @Autowired
  private NodeRepositoryImpl repository;

  @Autowired
  private CreateFile createFile;

  public Node execute(Node node) throws NodeNotFoundException, IOException, RuntimeException {
    Node exists = repository.findByFile(node.getFile());

    if (exists != null) {
      throw new RuntimeException("Node has been created, please use another filename");
    }

    node = repository.save(node);
    createFile.execute("", node.getFile());

    return node;
  }
}
