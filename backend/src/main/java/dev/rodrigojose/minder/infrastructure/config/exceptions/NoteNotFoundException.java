package dev.rodrigojose.minder.infrastructure.config.exceptions;

public class NoteNotFoundException extends RuntimeException {
  public NoteNotFoundException() {
    super("Note not found!");
  }

  public NoteNotFoundException(String message) {
    super(message);
  }
}
