package dev.rodrigojose.minder.adapters.inbound.controller;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import dev.rodrigojose.minder.application.usecases.file.DeleteUploadedImageFile;
import dev.rodrigojose.minder.application.usecases.file.UpdateFile;
import dev.rodrigojose.minder.application.usecases.file.UploadImageFile;
import dev.rodrigojose.minder.infrastructure.StandardResponseDto;

@CrossOrigin
@RestController
@RequestMapping("/file")
public class FileController {
  @Autowired
  private DeleteUploadedImageFile deleteUploadedImageFile;

  @Autowired
  private UploadImageFile uploadImageFile;

  @Autowired
  private UpdateFile updateFile;

  @PutMapping("/update/{id}")
  public ResponseEntity<StandardResponseDto<Void>> update(@PathVariable UUID id,
      @RequestBody(required = false) String data) throws IOException {
    StandardResponseDto<Void> response = new StandardResponseDto<>(
        LocalDateTime.now(),
        HttpStatus.OK.value(),
        "Content Updated!",
        null);

    String content = data == null ? "" : data;
    updateFile.execute(id, content);

    return ResponseEntity.ok(response);
  }

  @PostMapping("/assets/upload")
  public ResponseEntity<StandardResponseDto<String>> uploadImageFile(@RequestParam("fileImage") MultipartFile fileImage)
      throws IOException {
    String fileId = uploadImageFile.execute(fileImage);

    StandardResponseDto<String> response = new StandardResponseDto<>(
        LocalDateTime.now(),
        HttpStatus.OK.value(),
        "Uploaded file successfully!",
        fileId);

    return ResponseEntity.ok(response);

  }

  @DeleteMapping("/assets/upload/{fileName}")
  public ResponseEntity<StandardResponseDto<Void>> deleteUploadedImage(@PathVariable String fileName)
      throws IOException {
    deleteUploadedImageFile.execute(fileName);

    StandardResponseDto<Void> response = new StandardResponseDto<>(
        LocalDateTime.now(),
        HttpStatus.OK.value(),
        "Deleted uploaded file successfully!",
        null);

    return ResponseEntity.ok(response);
  }
}
