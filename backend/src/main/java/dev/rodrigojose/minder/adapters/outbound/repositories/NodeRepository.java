package dev.rodrigojose.minder.adapters.outbound.repositories;

import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;

import dev.rodrigojose.minder.entity.Node;

public interface NodeRepository extends JpaRepository<Node, UUID> {
}
