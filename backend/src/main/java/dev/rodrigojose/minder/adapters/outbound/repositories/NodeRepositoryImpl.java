package dev.rodrigojose.minder.adapters.outbound.repositories;

import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

import org.springframework.stereotype.Repository;

import dev.rodrigojose.minder.adapters.outbound.entities.JpaNodeEntity;
import dev.rodrigojose.minder.domain.node.Node;
import dev.rodrigojose.minder.domain.node.NodeRepository;

@Repository
public class NodeRepositoryImpl implements NodeRepository {
  private final JpaNodeRepository repository;

  public NodeRepositoryImpl(JpaNodeRepository repository) {
    this.repository = repository;
  }

  @Override
  public Node save(Node node) {
    JpaNodeEntity nodeEntity = new JpaNodeEntity(node);
    this.repository.save(nodeEntity);

    return new Node(
        nodeEntity.getId(),
        nodeEntity.getFile(),
        nodeEntity.getX(),
        nodeEntity.getY(),
        nodeEntity.getCreated_at());
  }

  @Override
  public Node findById(UUID id) {
    Optional<JpaNodeEntity> nodeEntity = this.repository.findById(id);
    return nodeEntity
        .map(entity -> new Node(entity.getId(), entity.getFile(), entity.getX(), entity.getY(), entity.getCreated_at()))
        .orElse(null);
  }

  @Override
  public Node findByFile(String file) {
    Optional<JpaNodeEntity> nodeEntity = this.repository.findByFile(file);
    return nodeEntity
        .map(entity -> new Node(entity.getId(), entity.getFile(), entity.getX(), entity.getY(), entity.getCreated_at()))
        .orElse(null);
  }

  @Override
  public List<Node> findAll() {
    return this.repository.findAll().stream()
        .map(node -> new Node(node.getId(), node.getFile(), node.getX(), node.getY(), node.getCreated_at()))
        .collect(Collectors.toList());
  }

  @Override
  public void deleteById(UUID id) {
    this.repository.deleteById(id);
  }

}
