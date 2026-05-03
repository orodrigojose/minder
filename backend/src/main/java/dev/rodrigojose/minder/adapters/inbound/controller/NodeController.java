package dev.rodrigojose.minder.adapters.inbound.controller;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import dev.rodrigojose.minder.application.usecases.file.FindByIdFile;
import dev.rodrigojose.minder.application.usecases.node.CreateNode;
import dev.rodrigojose.minder.application.usecases.node.DeleteByIdNode;
import dev.rodrigojose.minder.application.usecases.node.FindByIdNode;
import dev.rodrigojose.minder.application.usecases.node.GetAllNode;
import dev.rodrigojose.minder.application.usecases.node.UpdateNode;
import dev.rodrigojose.minder.application.usecases.node.VerifyIntegrityNode;
import dev.rodrigojose.minder.domain.node.Node;
import dev.rodrigojose.minder.domain.node.NodeUpdateDto;
import dev.rodrigojose.minder.infrastructure.StandardResponseDto;
import dev.rodrigojose.minder.infrastructure.config.exceptions.NodeNotFoundException;

@CrossOrigin
@RestController
@RequestMapping("/node")
public class NodeController {
  @Autowired
  private CreateNode createNodeUseCase;
  @Autowired
  private FindByIdNode findByIdNodeUseCase;
  @Autowired
  private GetAllNode getAllNodesUseCase;
  @Autowired
  private UpdateNode updateNodeUseCase;
  @Autowired
  private DeleteByIdNode deleteByIdNode;
  @Autowired
  private FindByIdFile findByIdFile;
  @Autowired
  private VerifyIntegrityNode verifyIntegrityNode;

  @GetMapping("/")
  public ResponseEntity<StandardResponseDto<List<Node>>> getAll() {
    var nodes = getAllNodesUseCase.execute();
    StandardResponseDto<List<Node>> response = new StandardResponseDto<>(
        LocalDateTime.now(),
        HttpStatus.OK.value(),
        "Node created!",
        nodes);

    return ResponseEntity.ok(response);
  }

  @GetMapping("/{id}")
  public ResponseEntity<StandardResponseDto<Optional<Node>>> findById(@PathVariable UUID id) {
    Optional<Node> node = findByIdNodeUseCase.execute(id);

    StandardResponseDto<Optional<Node>> response = new StandardResponseDto<>(
        LocalDateTime.now(),
        HttpStatus.OK.value(),
        "Node created!",
        node);

    return ResponseEntity.ok(response);
  }

  @CrossOrigin
  @GetMapping("/file/{id}")
  public ResponseEntity<StandardResponseDto> getFileContent(@PathVariable UUID id)
      throws IOException {
    String content = findByIdFile.execute(id);

    StandardResponseDto<String> response = new StandardResponseDto<String>(
        LocalDateTime.now(),
        HttpStatus.OK.value(),
        "Received sucessfully content.",
        content);

    return ResponseEntity.ok(response);
  }

  @PostMapping("/create")
  public ResponseEntity<StandardResponseDto<Node>> create(@RequestBody Node node)
      throws NodeNotFoundException, IOException, RuntimeException {
    Node result = createNodeUseCase.execute(node);

    StandardResponseDto response = new StandardResponseDto<Node>(
        LocalDateTime.now(),
        HttpStatus.CREATED.value(),
        "Node created.",
        result);
    return ResponseEntity.ok(response);
  }

  @CrossOrigin
  @DeleteMapping("/delete/{id}")
  public ResponseEntity<StandardResponseDto> delete(@PathVariable UUID id) throws IOException {
    deleteByIdNode.execute(id);

    StandardResponseDto<Object> response = new StandardResponseDto<>(
        LocalDateTime.now(),
        HttpStatus.OK.value(),
        "Node deleted successfully!",
        null);

    return ResponseEntity.ok(response);
  }

  @CrossOrigin
  @PutMapping("/update/{id}")
  public ResponseEntity<StandardResponseDto> update(@PathVariable UUID id, @RequestBody NodeUpdateDto data) {

    Node node = updateNodeUseCase.execute(id, data);

    StandardResponseDto response = new StandardResponseDto<Node>(
        LocalDateTime.now(),
        HttpStatus.OK.value(),
        "Node updated.",
        node);

    return ResponseEntity.ok(response);
  }

  @CrossOrigin
  @GetMapping("/verify-integrity")
  public  ResponseEntity<StandardResponseDto> getMethodName() throws IOException {
    List<Node> corruptedNodes = verifyIntegrityNode.execute();


    StandardResponseDto response = new StandardResponseDto<List<Node>>(
        LocalDateTime.now(),
        HttpStatus.OK.value(),
        "Node updated.",
        corruptedNodes);

    return ResponseEntity.ok(response);
  }

}
