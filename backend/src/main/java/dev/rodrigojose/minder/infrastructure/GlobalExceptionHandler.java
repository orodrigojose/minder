package dev.rodrigojose.minder.infrastructure;

import java.time.LocalDateTime;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import dev.rodrigojose.minder.infrastructure.config.exceptions.NodeNotFoundException;

@ControllerAdvice
public class GlobalExceptionHandler extends ResponseEntityExceptionHandler {
  @ExceptionHandler(NodeNotFoundException.class)
  private ResponseEntity<StandardResponseDto> nodeNotFoundHandler(NodeNotFoundException exception) {
    StandardResponseDto threatResponse = new StandardResponseDto(LocalDateTime.now(), HttpStatus.NOT_FOUND.value(),
        "Node not found!", null);

    return ResponseEntity.status(HttpStatus.NOT_FOUND).body(threatResponse);
  }

  @ExceptionHandler(RuntimeException.class)
  private ResponseEntity<StandardResponseDto> runtimeExcpetionHandler(RuntimeException exception) {
    StandardResponseDto threatResponse = new StandardResponseDto(LocalDateTime.now(),
        HttpStatus.INTERNAL_SERVER_ERROR.value(),
        "Internal server error!", null);

    return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(threatResponse);
  }
}
