package dev.rodrigojose.minder.adapters.outbound.repositories;

import java.time.LocalDate;
import java.util.Optional;
import java.util.UUID;

import static org.assertj.core.api.Assertions.assertThat;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.data.jpa.test.autoconfigure.DataJpaTest;
import org.springframework.test.context.ActiveProfiles;

import dev.rodrigojose.minder.adapters.outbound.entities.JpaNodeEntity;
import jakarta.persistence.EntityManager;

@DataJpaTest
@ActiveProfiles("test")
public class JpaNodeRepositoryTest {

  @Autowired
  JpaNodeRepository repository;

  @Autowired
  EntityManager entityManager;

  @Test
  @DisplayName("Should return Node successfully from database.")
  void testFindByFileCase1() {
    JpaNodeEntity data = new JpaNodeEntity();
    data.setFile("TDD");
    data.setX(0);
    data.setY(10);
    data.setCreated_at(LocalDate.now());
    JpaNodeEntity saved = this.createNode(data);

    Optional<JpaNodeEntity> result = this.repository.findById(saved.getId());

    assertThat(result.isPresent()).isTrue();
  }

  @Test
  @DisplayName("Should not get Node from database.")
  void testFindByFileCase2() {
    UUID id = new UUID(0, 0);
    System.out.println(id);

    Optional<JpaNodeEntity> result = this.repository.findById(id);

    assertThat(result.isPresent()).isFalse();
  }

  private JpaNodeEntity createNode(JpaNodeEntity data) {
    this.entityManager.persist(data);
    return data;
  }
}
