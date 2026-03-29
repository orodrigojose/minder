package dev.rodrigojose.minder.adapters.outbound.entities;

import java.time.LocalDate;
import java.util.UUID;

import org.hibernate.annotations.CreationTimestamp;

import dev.rodrigojose.minder.domain.node.Node;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "node")
public class JpaNodeEntity {
  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private UUID id;

  private String file;
  private Integer x;
  private Integer y;

  @CreationTimestamp
  private LocalDate created_at;

  public JpaNodeEntity() {
  }

  public JpaNodeEntity(Node node) {
    this.id = node.getId();
    this.file = node.getFile();
    this.x = node.getX();
    this.y = node.getY();
    this.created_at = node.getCreated_at();
  }

  public UUID getId() {
    return id;
  }

  public void setId(UUID id) {
    this.id = id;
  }

  public String getFile() {
    return file;
  }

  public void setFile(String file) {
    this.file = file;
  }

  public Integer getX() {
    return x;
  }

  public void setX(Integer x) {
    this.x = x;
  }

  public Integer getY() {
    return y;
  }

  public void setY(Integer y) {
    this.y = y;
  }

  public LocalDate getCreated_at() {
    return created_at;
  }

  public void setCreated_at(LocalDate created_at) {
    this.created_at = created_at;
  }

}
