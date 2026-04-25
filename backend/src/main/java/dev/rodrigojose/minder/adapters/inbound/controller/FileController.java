package dev.rodrigojose.minder.adapters.inbound.controller;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import dev.rodrigojose.minder.application.usecases.file.UpdateFile;
import dev.rodrigojose.minder.infrastructure.StandardResponseDto;


@CrossOrigin
@RestController
@RequestMapping("/file")
public class FileController {
  @Autowired
  private UpdateFile updateFile;
  
  @PutMapping("/update/{id}")
  public ResponseEntity<StandardResponseDto<Void>> update(@PathVariable UUID id, @RequestBody(required = false) String data) throws IOException {
    StandardResponseDto<Void> response = new StandardResponseDto<>(
      LocalDateTime.now(),
      HttpStatus.OK.value(),
      "Content Updated!",
      null
    );

    String content = data == null ? "" : data;
    updateFile.execute(id, content);
    return ResponseEntity.ok(response);
  }
  
}
