package dev.rodrigojose.minder.domain.edge;

import java.util.List;
import java.util.UUID;

public interface EdgeRepository {
  Edge save(Edge edge);
  Edge findById(UUID id);
  List<Edge> findAll();
  void deleteById(UUID id);
  void deleteBySourceOrTarget(UUID sourceUuid, UUID targetUuid);
}
