package jmpc.ChatApp.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.web.bind.annotation.CrossOrigin;

import jmpc.ChatApp.entities.User;

@CrossOrigin(origins = "*", maxAge = 3600)
public interface UserRepository extends JpaRepository<User, Integer> {

	Optional<User> findByUsername(String userName);
	
	Boolean existsByUsername(String userName);
	
	Boolean existsByEmail(String email);
}
