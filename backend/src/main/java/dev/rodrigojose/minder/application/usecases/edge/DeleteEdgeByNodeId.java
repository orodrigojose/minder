package dev.rodrigojose.minder.application.usecases.edge;

import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import dev.rodrigojose.minder.adapters.outbound.repositories.EdgeRepositoryImpl;

@Service
@Transactional
public class DeleteEdgeByNodeId {
  @Autowired
  private EdgeRepositoryImpl repository;

  public void execute(UUID id) {
    repository.deleteBySourceOrTarget(id, id);
  }
}
