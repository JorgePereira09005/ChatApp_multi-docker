package jmpc.ChatApp.payload.request;

import java.util.Set;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

public class SignupRequest {

	@NotBlank
    @Size(min = 3, max = 50)
    private String username;
	
	@NotBlank
    @Size(min = 6, max = 40)
    private String password;
	
	@NotBlank
    @Size(max = 50)
    @Email
    private String email;
	
	@Size(max = 512)
	private String profilePic;
	
	@NotBlank
    @Size(min =1, max = 100)
    private String firstName;
	
 	@NotBlank
    @Size(min =1, max = 100)
    private String lastName;
    
    @Size(max = 1024)
	private String description;
    
    private Set<String> role;

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
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

	public Set<String> getRole() {
		return role;
	}

	public void setRole(Set<String> role) {
		this.role = role;
	}
    
}
