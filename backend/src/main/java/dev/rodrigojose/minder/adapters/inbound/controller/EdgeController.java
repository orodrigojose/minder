package dev.rodrigojose.minder.adapters.inbound.controller;

import dev.rodrigojose.minder.application.usecases.edge.CreateEdge;
import dev.rodrigojose.minder.application.usecases.edge.DeleteEdge;
import dev.rodrigojose.minder.application.usecases.edge.GetAllEdge;
import dev.rodrigojose.minder.domain.edge.Edge;
import dev.rodrigojose.minder.infrastructure.config.exceptions.ErrorMessage;

import java.io.IOException;
import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@CrossOrigin
@RestController
@RequestMapping("/edge")
public class EdgeController {

  @Autowired
  DeleteEdge deleteEdgeUseCase = new DeleteEdge();

  @Autowired
  GetAllEdge getAllEdgesUseCase = new GetAllEdge();

  @Autowired
  CreateEdge createEdgeUseCase = new CreateEdge();

  @GetMapping("/")
  public ResponseEntity<List<Edge>> getAll() {
    return ResponseEntity.ok(getAllEdgesUseCase.execute());
  }

  @DeleteMapping("/delete/{id}")
  public ResponseEntity<?> delete(@PathVariable UUID id) {
    try {
      deleteEdgeUseCase.execute(id);
      return ResponseEntity.ok("Deleted");

    } catch (IllegalArgumentException e) {
      var errorMessage = new ErrorMessage(e.getMessage(), "INVALID_PARAMS");
      return ResponseEntity.status(400).body(errorMessage);
    }
  }

  @PostMapping("/create")
  public ResponseEntity<?> create(@RequestBody Edge edge) throws IOException {
    try {
      var response = createEdgeUseCase.execute(edge);
      return ResponseEntity.ok(response);
    } catch (IllegalArgumentException e) {
      var errorMessage = new ErrorMessage(e.getMessage(), "INVALID_PARAMS");
      return ResponseEntity.status(400).body(errorMessage);
    }
  }

}
