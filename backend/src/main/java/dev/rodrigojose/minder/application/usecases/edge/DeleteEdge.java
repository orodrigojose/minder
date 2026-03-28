package dev.rodrigojose.minder.application.usecases.edge;

import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import dev.rodrigojose.minder.domain.edge.EdgeRepository;

@Service
public class DeleteEdge {

  @Autowired
  EdgeRepository repository;

  public void execute(UUID id) {
    repository.deleteById(id);
  }

}
