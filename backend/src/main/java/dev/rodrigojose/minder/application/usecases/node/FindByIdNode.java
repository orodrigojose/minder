package dev.rodrigojose.minder.application.usecases.node;

import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import dev.rodrigojose.minder.adapters.outbound.repositories.NodeRepositoryImpl;
import dev.rodrigojose.minder.domain.node.Node;

@Service
public class FindByIdNode {

  @Autowired
  private NodeRepositoryImpl repository;

  public Optional<Node> execute(UUID id) {
    return Optional.ofNullable(repository.findById(id));
  }

}
