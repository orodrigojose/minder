package dev.rodrigojose.minder.adapters.outbound.entities;

import java.util.UUID;

import dev.rodrigojose.minder.domain.edge.Edge;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "edge")
public class JpaEdgeEntity {
  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private UUID id;
  private UUID source;
  private UUID target;

  public JpaEdgeEntity() {
  }

  public JpaEdgeEntity(Edge edge) {
    this.id = edge.getId();
    this.source = edge.getSource();
    this.target = edge.getTarget();
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
