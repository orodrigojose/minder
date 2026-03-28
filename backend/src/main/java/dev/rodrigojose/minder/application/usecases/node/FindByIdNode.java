package dev.rodrigojose.minder.application.usecases.node;

import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import dev.rodrigojose.minder.adapters.outbound.repositories.NodeRepository;
import dev.rodrigojose.minder.entity.Node;

@Service
public class FindByIdNode {

  @Autowired
  private NodeRepository nodeRepository;

  public Optional<Node> execute(UUID id) {
    return nodeRepository.findById(id);
  }

}
