package jmpc.ChatApp.entities;

import java.util.HashSet;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;

@Entity
@Table(name="user",
	   uniqueConstraints = {
			@UniqueConstraint(columnNames = "user_name"),
			@UniqueConstraint(columnNames = "email")
		})
public class User {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="id")
	private Integer id;
	
	@NotBlank
	@Size(max = 50)
	@Column(name="user_name")
	private String username;
	
	@NotBlank
	@Size(max=50)
	@Email
	@Column(name="email")
	private String email;
	
	@Size(max = 512)
	@Column(name="profile_pic_url")
	private String profilePic;
	
	@NotBlank
	@Size(max=68)
	@Column(name="password")
	private String password;
	
	@NotBlank
	@Size(max=100)
	@Column(name = "first_name")
	private String firstName;
	
	@NotBlank
	@Size(max=100)
	@Column(name = "last_name")
	private String lastName;
	
	@Size(max = 1024)
	@Column(name="description")
	private String description;
	
//	@JsonManagedReference
	@OneToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL, mappedBy="postedBy")
	private Set<Post> posts = new HashSet<>();
	
	@ManyToMany(fetch = FetchType.LAZY)
	@JoinTable(	name = "user_roles", 
				joinColumns = @JoinColumn(name = "user_id"), 
				inverseJoinColumns = @JoinColumn(name = "role_id"))
	private Set<Role> roles = new HashSet<>();
	
//	@OneToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL, mappedBy="requester")
//	private Set<FriendRequest> requestsMade = new HashSet<>();
//	
//	@OneToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL, mappedBy="requestedTo")
//	private Set<FriendRequest> requestsReceived = new HashSet<>();
	
	public User() {
		
	}
	
	public User(@NotBlank @Size(max = 50) String userName, @NotBlank @Size(max = 50) @Email String email,
			@Size(max = 512) String profilePic, @NotBlank @Size(max = 68) String password,
			@NotBlank @Size(max = 100) String firstName, @NotBlank @Size(max = 100) String lastName,
			@Size(max = 1024) String description) {
		this.username = userName;
		this.email = email;
		this.profilePic = profilePic;
		this.password = password;
		this.firstName = firstName;
		this.lastName = lastName;
		this.description = description;
	}


	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getProfilePic() {
		return profilePic;
	}

	public void setProfilePic(String profilePic) {
		this.profilePic = profilePic;
	}

	@JsonIgnore
	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}
	

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	@JsonIgnore
	public Set<Post> getPosts() {
		return posts;
	}

	public void setPosts(Set<Post> posts) {
		this.posts = posts;
	}

	@JsonIgnore
	public Set<Role> getRoles() {
		return roles;
	}

	public void setRoles(Set<Role> roles) {
		this.roles = roles;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((email == null) ? 0 : email.hashCode());
		result = prime * result + ((firstName == null) ? 0 : firstName.hashCode());
		result = prime * result + ((id == null) ? 0 : id.hashCode());
		result = prime * result + ((lastName == null) ? 0 : lastName.hashCode());
		result = prime * result + ((password == null) ? 0 : password.hashCode());
		result = prime * result + ((username == null) ? 0 : username.hashCode());
		result = prime * result + ((description == null) ? 0 : description.hashCode());
		result = prime * result + ((profilePic == null) ? 0 : profilePic.hashCode());
		return result;
	}	

}
