package dev.rodrigojose.minder.adapters.outbound.repositories;

import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

import org.springframework.stereotype.Repository;

import dev.rodrigojose.minder.adapters.outbound.entities.JpaEdgeEntity;
import dev.rodrigojose.minder.domain.edge.Edge;
import dev.rodrigojose.minder.domain.edge.EdgeRepository;

@Repository
public class EdgeRepositoryImpl implements EdgeRepository {

  private final JpaEdgeRepository jpaEdgeRepository;

  public EdgeRepositoryImpl(JpaEdgeRepository jpaEdgeRepository) {
    this.jpaEdgeRepository = jpaEdgeRepository;
  }

  @Override
  public Edge save(Edge edge) {
    JpaEdgeEntity edgeEntity = new JpaEdgeEntity(edge);
    this.jpaEdgeRepository.save(edgeEntity);
    return new Edge(edgeEntity.getId(), edgeEntity.getSource(), edgeEntity.getTarget());
  }

  @Override
  public Edge findById(UUID id) {
    Optional<JpaEdgeEntity> edgeEntity = this.jpaEdgeRepository.findById(id);
    return edgeEntity.map(entity -> new Edge(entity.getId(), entity.getSource(), entity.getTarget())).orElse(null);
  }

  @Override
  public List<Edge> findAll() {
    return this.jpaEdgeRepository.findAll().stream()
        .map(edge -> new Edge(edge.getId(), edge.getSource(), edge.getTarget())).collect(Collectors.toList());
  }

  @Override
  public void deleteById(UUID id) {
    this.jpaEdgeRepository.deleteById(id);
  }

  @Override
  public void deleteBySourceOrTarget(UUID sourceUuid, UUID targetUuid) {
    this.jpaEdgeRepository.deleteBySourceOrTarget(sourceUuid, targetUuid);
  }

}
