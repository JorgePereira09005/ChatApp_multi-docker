package jmpc.ChatApp.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.web.bind.annotation.CrossOrigin;

import jmpc.ChatApp.entities.ERole;
import jmpc.ChatApp.entities.Role;

@CrossOrigin(origins = "*", maxAge = 3600)
public interface RoleRepository extends JpaRepository<Role, Integer> {

	Optional<Role> findByName(ERole name);
}
