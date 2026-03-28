package dev.rodrigojose.minder.infrastructure.config.exceptions;

public class NodeNotFoundException extends RuntimeException {
  public NodeNotFoundException() {
    super("Node not found!");
  }

  public NodeNotFoundException(String message) {
    super(message);
  }
}
