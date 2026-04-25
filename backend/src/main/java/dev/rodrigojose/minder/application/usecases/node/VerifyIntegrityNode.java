package dev.rodrigojose.minder.application.usecases.node;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import dev.rodrigojose.minder.domain.node.Node;

@Service
public class VerifyIntegrityNode {

  @Value("${minder.workspace:./.minder/nodes}")
  private String workspace;

  @Autowired
  private DeleteByIdNode deleteByIdNode;

  @Autowired
  private GetAllNode getAllNode;

  public List<Node> execute() throws IOException {
    List<Node> nodes = getAllNode.execute();
    List<Node> corruptedNodes = new ArrayList<Node>();

    for (int i = 0; i < nodes.size(); i++) {
      Node node = nodes.get(i);
      Boolean existsFile = Files.exists(Paths.get(String.format("%s/%s", workspace, node.getFile())));

      if (!existsFile) {
        corruptedNodes.add(node);
        deleteByIdNode.execute(node.getId());
      }
    }

    return corruptedNodes;
  }

}
