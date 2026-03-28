package dev.rodrigojose.minder.adapters.inbound.controller;

import java.io.IOException;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
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

import dev.rodrigojose.minder.application.services.FileStorageService;
import dev.rodrigojose.minder.application.usecases.node.CreateNode;
import dev.rodrigojose.minder.application.usecases.node.FindByIdNode;
import dev.rodrigojose.minder.application.usecases.node.GetAllNode;
import dev.rodrigojose.minder.application.usecases.node.UpdateNode;
import dev.rodrigojose.minder.dtos.NodeUpdateDto;
import dev.rodrigojose.minder.entity.Node;
import dev.rodrigojose.minder.infrastructure.config.exceptions.NodeNotFoundException;

@CrossOrigin
@RestController
@RequestMapping("/node")
public class NodeController {

  @Autowired
  CreateNode createNodeUseCase = new CreateNode();

  @Autowired
  FindByIdNode findByIdNodeUseCase = new FindByIdNode();

  @Autowired
  GetAllNode getAllNodesUseCase = new GetAllNode();

  @Autowired
  FileStorageService fileStorageService = new FileStorageService();

  @Autowired
  UpdateNode updateNodeUseCase = new UpdateNode();

  @GetMapping("/{id}")
  public ResponseEntity<?> findById(@PathVariable UUID id) {
    return ResponseEntity.ok(findByIdNodeUseCase.execute(id));
  }

  @GetMapping("/")
  public ResponseEntity<?> getAll() {
    return ResponseEntity.ok(getAllNodesUseCase.execute());
  }

  @GetMapping("/file/{file}/{id}")
  @CrossOrigin
  public ResponseEntity<?> getMethodName(@PathVariable String file, @PathVariable UUID id) throws IOException {
    var result = fileStorageService.findById(id, file);
    return ResponseEntity.ok(result);
  }

  @PostMapping("/create")
  public ResponseEntity<?> create(@RequestBody Node node) throws NodeNotFoundException, IOException {
    var result = createNodeUseCase.execute(node);
    fileStorageService.create("", node.getFile());

    return ResponseEntity.ok(result);

  }

  @CrossOrigin
  @PutMapping("/update/{id}")
  public ResponseEntity<?> update(@PathVariable UUID id, @RequestBody NodeUpdateDto data) {
    return ResponseEntity.ok(updateNodeUseCase.execute(id, data));
  }

  @GetMapping("/delete/{id}")
  public void delete(@PathVariable UUID id) throws IOException {
    fileStorageService.delete(id);
  }

}
