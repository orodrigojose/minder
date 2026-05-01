package dev.rodrigojose.minder.application.usecases.file;

import java.io.IOException;
import java.nio.file.FileAlreadyExistsException;
import java.nio.file.Files;
import java.nio.file.Path;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.io.TempDir;

public class CreateFileTest {
  @TempDir
  Path tempDir;

  @Test
  @DisplayName("Should create file with content when it doesn't exist")
  void shouldCreateFileWithContent() throws IOException {
    CreateFile createFile = new CreateFile(tempDir.toString());

    createFile.execute("# Hello World!", "notes/test.md");

    Path file = tempDir.resolve("notes/test.md");
    assertThat(Files.exists(file)).isTrue();
    assertThat(Files.readString(file)).isEqualTo("# Hello World!");
  }

  @Test
  @DisplayName("Should create nested directories automatically")
  void shouldCreateNestedDirectories() throws IOException {
    CreateFile createFile = new CreateFile(tempDir.toString());

    createFile.execute("content", "a/b/c/file.md");

    assertThat(Files.exists(tempDir.resolve("a/b/c/file.md"))).isTrue();
  }

  @Test
  @DisplayName("Should throw exception when file already exists (prevents overwrite)")
  void shouldThrowExceptionWhenFileAlreadyExists() throws IOException {
    CreateFile createFile = new CreateFile(tempDir.toString());

    createFile.execute("# Hello World!", "notes/test.md");

    assertThatThrownBy(() -> createFile.execute("# Other content", "notes/test.md"))
        .isInstanceOf(FileAlreadyExistsException.class)
        .hasMessageContaining("notes/test.md");
  }

  @Test
  @DisplayName("Should throw exception for duplicate in nested path")
  void shouldThrowExceptionWhenNestedFileExists() throws IOException {
    CreateFile createFile = new CreateFile(tempDir.toString());

    createFile.execute("original", "folder/file.md");

    assertThatThrownBy(() -> createFile.execute("duplicate", "folder/file.md"))
        .isInstanceOf(FileAlreadyExistsException.class);
  }
}
