package de.nicoco.usermanagement;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface UserRepository extends CrudRepository<User, UUID> {
  User findByUsername(String username);

  User findByEmail(String email);

  User findById(UUID id);

}
