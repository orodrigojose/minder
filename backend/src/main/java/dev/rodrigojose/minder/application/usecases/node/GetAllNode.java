package dev.rodrigojose.minder.application.usecases.node;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import dev.rodrigojose.minder.adapters.outbound.repositories.NodeRepository;
import dev.rodrigojose.minder.entity.Node;

@Service
public class GetAllNode {

  @Autowired
  private NodeRepository nodeRepository;

  public List<Node> execute() {
    return nodeRepository.findAll();
  }

}
