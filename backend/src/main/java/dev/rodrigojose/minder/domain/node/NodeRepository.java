package dev.rodrigojose.minder.domain.node;

import java.util.List;
import java.util.UUID;

public interface NodeRepository {
  Node save(Node node);
  Node findById(UUID id);
  List<Node> findAll();
  void deleteById(UUID id);
}
