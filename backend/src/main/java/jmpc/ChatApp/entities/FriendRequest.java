package jmpc.ChatApp.entities;

import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonFormat;

@Entity
@Table(name="friend_request")
public class FriendRequest {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="id")
	private Integer id;

	@JsonFormat(pattern="yyyy-MM-dd HH:mm:ss")
	@Column(name="date")
	private LocalDateTime acceptDate;
	
	@Column(name="is_accepted")
	private boolean isAccepted;
	
	@ManyToOne(targetEntity = User.class)
	@JoinColumn(name = "requester_id")
	private User requester;
	
	@Column(name="requester_id", insertable = false, updatable = false)
	private int requesterId;
	
	@ManyToOne(targetEntity = User.class)
	@JoinColumn(name = "requested_to_id")
	private User requested_to;
	
	@Column(name="requested_to_id", insertable = false, updatable = false)
	private int requestedToId;
	
	public FriendRequest() {
		
	}

	public FriendRequest(LocalDateTime acceptDate, boolean isAccepted, User requester, int requesterId,
			User requested_to, int requestedToId) {
		this.acceptDate = acceptDate;
		this.isAccepted = isAccepted;
		this.requester = requester;
		this.requesterId = requesterId;
		this.requested_to = requested_to;
		this.requestedToId = requestedToId;
	}


	public Integer getId() {
		return id;
	}


	public void setId(Integer id) {
		this.id = id;
	}

	public LocalDateTime getAcceptDate() {
		return acceptDate;
	}

	public void setAcceptDate(LocalDateTime acceptDate) {
		this.acceptDate = acceptDate;
	}

	public boolean isAccepted() {
		return isAccepted;
	}

	public void setAccepted(boolean accepted) {
		this.isAccepted = accepted;
	}

	public int getRequesterId() {
		return requesterId;
	}

	public void setRequesterId(int requesterId) {
		this.requesterId = requesterId;
	}

	public int getRequestedToId() {
		return requestedToId;
	}

	public void setRequestedToId(int requestedToId) {
		this.requestedToId = requestedToId;
	}

	public User getRequester() {
		return requester;
	}

	public void setRequester(User requester) {
		this.requester = requester;
	}

	public User getRequested_to() {
		return requested_to;
	}

	public void setRequested_to(User requested_to) {
		this.requested_to = requested_to;
	}
	
}
