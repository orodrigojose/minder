package dev.rodrigojose.minder.application.usecases.edge;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import dev.rodrigojose.minder.domain.edge.Edge;
import dev.rodrigojose.minder.domain.edge.EdgeRepository;

@Service
public class GetAllEdge {

  @Autowired
  private EdgeRepository edgeRepository;

  public List<Edge> execute() {
    return edgeRepository.findAll();
  }

}
