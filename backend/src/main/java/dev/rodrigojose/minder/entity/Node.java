package dev.rodrigojose.minder.entity;

import java.time.LocalDate;
import java.util.UUID;

import org.hibernate.annotations.CreationTimestamp;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "node")
public class Node {
  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private UUID id;

  private String file;
  private Integer x;
  private Integer y;

  @CreationTimestamp
  private LocalDate created_at;

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

  @Override
  public String toString() {
    return "Node [id=" + id + ", file=" + file + ", x=" + x + ", y=" + y + ", created_at=" + created_at + "]";
  }
}
