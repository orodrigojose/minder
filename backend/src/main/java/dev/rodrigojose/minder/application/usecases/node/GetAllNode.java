package dev.rodrigojose.minder.application.usecases.node;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import dev.rodrigojose.minder.adapters.outbound.repositories.NodeRepositoryImpl;
import dev.rodrigojose.minder.domain.node.Node;

@Service
public class GetAllNode {

  @Autowired
  private NodeRepositoryImpl repository;

  public List<Node> execute() {
    return repository.findAll();
  }

}
