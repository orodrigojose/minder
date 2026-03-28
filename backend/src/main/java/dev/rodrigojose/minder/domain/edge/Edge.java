package dev.rodrigojose.minder.domain.edge;

import java.util.UUID;

public class Edge {

  private UUID id;

  private UUID source;

  private UUID target;

  public Edge() {
  }

  public Edge(UUID id, UUID source, UUID target) {
    this.id = id;
    this.source = source;
    this.target = target;
  }

  public UUID getId() {
    return id;
  }

  public void setId(UUID id) {
    this.id = id;
  }

  public UUID getSource() {
    return source;
  }

  public void setSource(UUID source) {
    this.source = source;
  }

  public UUID getTarget() {
    return target;
  }

  public void setTarget(UUID target) {
    this.target = target;
  }
}
