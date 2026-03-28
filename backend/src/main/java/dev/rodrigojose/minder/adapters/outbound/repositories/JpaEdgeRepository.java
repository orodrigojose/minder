package dev.rodrigojose.minder.adapters.outbound.repositories;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import dev.rodrigojose.minder.adapters.outbound.entities.JpaEdgeEntity;

public interface JpaEdgeRepository extends JpaRepository<JpaEdgeEntity, UUID> {

}
