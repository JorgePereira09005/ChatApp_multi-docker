package jmpc.ChatApp.repositories;

import java.util.Set;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.web.bind.annotation.CrossOrigin;

import jmpc.ChatApp.entities.Post;

@CrossOrigin(origins = "*", maxAge = 3600)
public interface PostRepository extends JpaRepository<Post, Integer> {

	Set<Post> findByPostedbyid(int postedById);
}
