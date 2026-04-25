package dev.rodrigojose.minder.application.usecases.node;

import java.io.IOException;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import dev.rodrigojose.minder.adapters.outbound.repositories.NodeRepositoryImpl;
import dev.rodrigojose.minder.application.usecases.edge.DeleteEdgeByNodeId;
import dev.rodrigojose.minder.application.usecases.file.DeleteByIdFile;
import dev.rodrigojose.minder.domain.node.Node;
import dev.rodrigojose.minder.infrastructure.config.exceptions.NodeNotFoundException;

@Service
@Transactional
public class DeleteByIdNode {
  @Autowired
  private NodeRepositoryImpl repository;
  
  @Autowired
  private DeleteEdgeByNodeId deleteEdgeByNodeId;
  
  @Autowired
  private DeleteByIdFile deleteByIdFile;

  public void execute(UUID id) throws IOException {
    Node node = repository.findById(id);

    if (node == null) {
      throw new NodeNotFoundException("Node id=" + id + " not found!");
    }
    
    deleteEdgeByNodeId.execute(id);
    deleteByIdFile.execute(id);
    repository.deleteById(id);
  }

}
