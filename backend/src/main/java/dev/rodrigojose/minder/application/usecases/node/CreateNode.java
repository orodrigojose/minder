package dev.rodrigojose.minder.application.usecases.node;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import dev.rodrigojose.minder.adapters.outbound.repositories.NodeRepository;
import dev.rodrigojose.minder.entity.Node;

@Service
public class CreateNode {
  @Autowired
  private NodeRepository nodeRepository;

  public Node execute(Node node) {
    node = nodeRepository.save(node);

    return node;
  }
}
