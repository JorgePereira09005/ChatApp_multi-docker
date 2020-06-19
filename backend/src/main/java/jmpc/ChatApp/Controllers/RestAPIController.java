package jmpc.ChatApp.Controllers;

import java.util.Collection;
import java.util.NoSuchElementException;
import java.util.Optional;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import jmpc.ChatApp.entities.FriendRequest;
import jmpc.ChatApp.entities.Post;
import jmpc.ChatApp.entities.User;
import jmpc.ChatApp.repositories.FriendRequestRepository;
import jmpc.ChatApp.repositories.PostRepository;
import jmpc.ChatApp.repositories.UserRepository;

@RestController
@CrossOrigin(origins = "*", maxAge = 3600)
@RequestMapping(path = "/api")
public class RestAPIController {

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private PostRepository postRepository;

	@Autowired
	private FriendRequestRepository friendRequestRepository;

	@GetMapping(path = "/users")
	private Collection<User> getUsers() {
		return this.userRepository.findAll();
	}
	
	@GetMapping(path = "/users/{username}")
	private ResponseEntity<?> getUser(@PathVariable String username) {
		
		User user;
		
		try {
			user = this.userRepository.findByUsername(username).get();
		} catch (Exception e) {
			return new ResponseEntity<String>("User could not be found.",
					HttpStatus.BAD_REQUEST);
		}
		return new ResponseEntity<User>(user, HttpStatus.OK);
	}

	@GetMapping(path = "/posts")
	private Collection<Post> getPosts() {
		return this.postRepository.findAll();
	}

	@GetMapping(path = "/posts/{id}")
	private Post getPost(@PathVariable int id) {

		try {
			return postRepository.findById(id).get();

		} catch (NoSuchElementException e) {
			throw new ResponseStatusException(HttpStatus.NOT_FOUND, "entity not found");
		}
	}

//	@PostMapping(path="/posts")
//	private Post submitNewPost(@RequestBody Post newPost) {
//        return this.postRepository.save(newPost);
//	}

	@PostMapping(path = "/posts")
	private Post submitNewPost(@RequestBody Post newPost) {

		if (newPost.getParentpostid() != null) {
			newPost.setParentPost(postRepository.getOne(newPost.getParentpostid()));
		}

//		newPost.setParentPost(postRepository.getOne(newPost.getParentpostid()));

		return this.postRepository.save(newPost);
	}

	@GetMapping(path = "/posts/user/{id}")
	private Set<Post> getUserPosts(@PathVariable int id) {

		try {
			return this.postRepository.findByPostedbyid(id);
		} catch (NoSuchElementException e) {
			throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Entity not found");
		}
	}

	@GetMapping(path = "/friendrequests")
	private Collection<FriendRequest> getFriendRequests() {
		return this.friendRequestRepository.findAll();
	}

	@GetMapping(path = "/friendrequests/{id}")
	private FriendRequest getFriendRequest(@PathVariable int id) {

		try {
			return this.friendRequestRepository.findById(id).get();
		} catch (NoSuchElementException e) {
			throw new ResponseStatusException(HttpStatus.NOT_FOUND, "entity not found");
		}
	}

	@GetMapping(path = "/friendrequests/user/{id}")
	private Set<FriendRequest> getUserFriendRequests(@PathVariable int id) {

		try {
			return this.friendRequestRepository.everyFriendRequestByRequesterIdOrRequestedToId(id);
		} catch (NoSuchElementException e) {
			throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Entity not found");
		}
	}

	@PostMapping(path = "/friendrequests", produces="text/plain")
	private ResponseEntity<String> submitNewFriendRequests(@RequestBody FriendRequest friendRequest) {

		// make sure the friend request belongs to the logged in user
		UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		 
		if (!userDetails.getUsername().equals(friendRequest.getRequester().getUsername())) {
			return new ResponseEntity<String>("Friend request does not belong to the logged in user!",
					HttpStatus.BAD_REQUEST);
		}

		int requestedToId = friendRequest.getRequestedToId();
		int requesterId = friendRequest.getRequesterId();

		try {

			if (this.friendRequestRepository.existsByRequestedToIdAndRequesterId(requestedToId, requesterId)) {
				return new ResponseEntity<String>("Friend request already exists and is pending or has been rejected.",
						HttpStatus.CONFLICT);
			}


		} catch (Exception e) {
			return new ResponseEntity<String>(
					"There was an error submitting the friend request! One or more users might not exist.",
					HttpStatus.BAD_REQUEST);
		}

		this.friendRequestRepository.save(friendRequest);

		return new ResponseEntity<String>("Friend request sent!", HttpStatus.OK);

	}

	@PostMapping(value = "/friendrequests/accept", produces="text/plain")
	private ResponseEntity<String> acceptFriendRequest(@RequestBody FriendRequest friendRequest) {

		// make sure the friend request is addressed to the logged in user
		UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

		if (!userDetails.getUsername().contentEquals(friendRequest.getRequested_to().getUsername())) {
			return new ResponseEntity<String>("Friend request cannot be accepted by the logged in user!",
					HttpStatus.BAD_REQUEST);
		}

		// check if the posted friend request is already accepted (it should normally be
		// false) and also check the friend requested in question is already accepted in
		// the database

		if (!friendRequest.isAccepted()
				&& !this.friendRequestRepository.isFriendRequestAccepted(friendRequest.getId())) {

			friendRequest.setAccepted(true);
			friendRequest.setAcceptDate(java.time.LocalDateTime.now());
			this.friendRequestRepository.save(friendRequest);

			try {
				FriendRequest inverseRequest = this.friendRequestRepository
						.findByRequestedToId(friendRequest.getRequesterId()).get();

				if (inverseRequest != null) {
					this.friendRequestRepository.delete(inverseRequest);
				}

			} catch (Exception e) {
			}
			
			return new ResponseEntity<String>("Friend request accepted!", HttpStatus.OK);

		} else {
			return new ResponseEntity<String>("Friend request already accepted!", HttpStatus.CONFLICT);
		}

	}

	@PostMapping(path = "/friendrequests/decline", produces="text/plain")
	private ResponseEntity<String> declineFriendRequest(@RequestBody FriendRequest friendRequest) {

		// make sure the friend request is addressed to the logged in user
		UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

		if (!userDetails.getUsername().contentEquals(friendRequest.getRequested_to().getUsername())) {
			return new ResponseEntity<String>("Friend request does not belong to the logged in user!",
					HttpStatus.BAD_REQUEST);
		}

		// TODO: front end should show confirmation text box
		this.friendRequestRepository.delete(friendRequest);
		return new ResponseEntity<String>("Friend request declined.", HttpStatus.OK);
	}
	
	@PostMapping(path = "/friendrequests/unfriend", produces="text/plain")
	private ResponseEntity<String> unfriend(@RequestBody FriendRequest friendRequest) {

		// make sure the unfriending is being done by the logged in user and not someone from the outside
		UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		
		//check if the logged in user's name appears as either the name of the requestedTo or requester of the friendrequest
		if( !friendRequest.getRequested_to().getUsername().equals(userDetails.getUsername()) && !friendRequest.getRequester().getUsername().equals(userDetails.getUsername()) ) {
			return new ResponseEntity<String>("This friend does not belong to you!", HttpStatus.BAD_REQUEST);
		}
		
		FriendRequest request;

		try {
			request = this.friendRequestRepository.findByRequestedToIdAndRequesterId(friendRequest.getRequestedToId(), friendRequest.getRequesterId()).get();
			this.friendRequestRepository.delete(request);
		} catch(Exception e) {
			request = this.friendRequestRepository.findByRequestedToIdAndRequesterId(friendRequest.getRequesterId(), friendRequest.getRequestedToId()).get();
			this.friendRequestRepository.delete(request);
		}
		
		return new ResponseEntity<String>("Friend removed!", HttpStatus.OK);
	}
	

}
