package jmpc.ChatApp.payload.response;

import java.util.List;

public class JwtResponse {

	private String token;
	private String type = "Bearer";
	private Integer id;
	private String username;
	private String description;
	private String profilePic;
	private String email;
	
	private List<String> roles;

	public JwtResponse(String accessToken, Integer id, String username, String description, String profilePic, String email,
			List<String> roles) {
		
		this.token = accessToken;
		this.id = id;
		this.username = username;
		this.description = description;
		this.profilePic = profilePic;
		this.email = email;
		this.roles = roles;
	}
	
	public String getAccessToken() {
		return token;
	}

	public void setAccessToken(String accessToken) {
		this.token = accessToken;
	}

	public String getTokenType() {
		return type;
	}

	public void setTokenType(String tokenType) {
		this.type = tokenType;
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

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getProfilePic() {
		return profilePic;
	}

	public void setProfilePic(String profilePic) {
		this.profilePic = profilePic;
	}

	public List<String> getRoles() {
		return roles;
	}
}
