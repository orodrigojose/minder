package dev.rodrigojose.minder.adapters.inbound.controller;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/file")
public class FileController {
  @PostMapping("/new")
  public void createFile() {

  }

}
