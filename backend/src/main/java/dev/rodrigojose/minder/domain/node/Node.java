package dev.rodrigojose.minder.domain.node;

import java.time.LocalDate;
import java.util.UUID;

public class Node {
  private UUID id;

  private String file;
  private Integer x;
  private Integer y;

  private LocalDate created_at;

  public Node() {

  }

  public Node(UUID id, String file, Integer x, Integer y, LocalDate created_at) {
    this.id = id;
    this.file = file;
    this.x = x;
    this.y = y;
    this.created_at = created_at;
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

  @Override
  public String toString() {
    return "Node [id=" + id + ", file=" + file + ", x=" + x + ", y=" + y + ", created_at=" + created_at + "]";
  }
}
