package dev.rodrigojose.minder.infrastructure;

import java.io.IOException;
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
        exception.getMessage(), null);

    return ResponseEntity.status(HttpStatus.NOT_FOUND).body(threatResponse);
  }

  @ExceptionHandler(IOException.class)
  private ResponseEntity<StandardResponseDto> ioExceptionHandler(IOException exception) {
    StandardResponseDto threatResponse = new StandardResponseDto(LocalDateTime.now(), 
        HttpStatus.BAD_REQUEST.value(),
        "Erro ao processar arquivo: " + exception.getMessage(), null);

    return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(threatResponse);
  }

  @ExceptionHandler(RuntimeException.class)
  private ResponseEntity<StandardResponseDto> runtimeExceptionHandler(RuntimeException exception) {
    StandardResponseDto threatResponse = new StandardResponseDto(LocalDateTime.now(),
        HttpStatus.INTERNAL_SERVER_ERROR.value(),
        "Erro interno do servidor: " + exception.getMessage(), null);

    return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(threatResponse);
  }
}
