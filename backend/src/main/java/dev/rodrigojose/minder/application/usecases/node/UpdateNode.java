package dev.rodrigojose.minder.application.usecases.node;

import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import dev.rodrigojose.minder.adapters.outbound.repositories.NodeRepositoryImpl;
import dev.rodrigojose.minder.domain.node.Node;
import dev.rodrigojose.minder.domain.node.NodeUpdateDto;
import dev.rodrigojose.minder.infrastructure.config.exceptions.NodeNotFoundException;

@Service
public class UpdateNode {
  @Autowired
  private NodeRepositoryImpl repository;

  public Node execute(UUID id, NodeUpdateDto data) {
    Node existingNode = repository.findById(id);

    if (existingNode == null) {
      throw new NodeNotFoundException("Node not found");
    }

    if (data.getX() != 0) { 
      existingNode.setX(data.getX());
    }

    if (data.getY() != 0) {
      existingNode.setY(data.getY());
    }

    if (data.getFile() != null) {
      existingNode.setFile(data.getFile());
    }

    return repository.save(existingNode);
  }
}
