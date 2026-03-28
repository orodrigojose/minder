package dev.rodrigojose.minder.infrastructure;

import java.time.LocalDateTime;

public class StandardResponseDto<T> {
  private LocalDateTime timestamp;
  private int status;
  private String message;
  private T data;

  public StandardResponseDto() {
  }

  public StandardResponseDto(LocalDateTime timestamp, int status, String message, T data) {
    this.timestamp = timestamp;
    this.status = status;
    this.message = message;
    this.data = data;
  }

  public LocalDateTime getTimestamp() {
    return timestamp;
  }

  public void setTimestamp(LocalDateTime timestamp) {
    this.timestamp = timestamp;
  }

  public int getStatus() {
    return status;
  }

  public void setStatus(int status) {
    this.status = status;
  }

  public String getMessage() {
    return message;
  }

  public void setMessage(String message) {
    this.message = message;
  }

  public T getData() {
    return data;
  }

  public void setData(T data) {
    this.data = data;
  }

}
