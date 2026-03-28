package dev.rodrigojose.minder.application.usecases.edge;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import dev.rodrigojose.minder.domain.edge.Edge;
import dev.rodrigojose.minder.domain.edge.EdgeRepository;

@Service
public class CreateEdge {
  @Autowired
  private EdgeRepository edgeRepository;

  public Edge execute(Edge edge) {
    edge = edgeRepository.save(edge);

    return edge;
  }
}
