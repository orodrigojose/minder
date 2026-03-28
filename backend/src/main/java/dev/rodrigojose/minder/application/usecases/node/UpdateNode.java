package dev.rodrigojose.minder.application.usecases.node;

import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import dev.rodrigojose.minder.adapters.outbound.repositories.NodeRepository;
import dev.rodrigojose.minder.dtos.NodeUpdateDto;
import dev.rodrigojose.minder.entity.Node;

@Service
public class UpdateNode {
  @Autowired
  private NodeRepository nodeRepository;

  public Node execute(UUID id, NodeUpdateDto data) {
    Node existingNode = nodeRepository.findById(id)
        .orElseThrow(() -> new RuntimeException("Node not found with id: " + id));

    if (data.getX() != 0) { 
      existingNode.setX(data.getX());
    }

    if (data.getY() != 0) {
      existingNode.setY(data.getY());
    }

    if (data.getFile() != null) {
      existingNode.setFile(data.getFile());
    }

    return nodeRepository.save(existingNode);
  }
}
