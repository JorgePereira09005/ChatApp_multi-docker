package jmpc.ChatApp.entities;

import java.time.LocalDateTime;
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
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;

@Entity
@Table(name="post")
public class Post {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="id")
	private Integer id;
	
	@JsonFormat(pattern="yyyy-MM-dd HH:mm:ss")
	@Column(name="date_post")
	private LocalDateTime datePost;
	
	@Column(name="content")
	private String content;
	
//	@JsonBackReference
	@ManyToOne
	@JoinColumn(name="poster_id")
	private User postedBy;
	
	@Column(name="poster_id", insertable = false, updatable = false)
	private Integer postedbyid;
	
//	@JsonBackReference
	@ManyToOne
	@JoinColumn(name="parent_post_id")
	private Post parentPost;
	
	@Column(name="parent_post_id", insertable = false, updatable = false)
	private Integer parentpostid;
	
//	@JsonManagedReference
	@OneToMany(fetch = FetchType.LAZY ,cascade =  CascadeType.ALL, mappedBy = "parentPost")
	private Set<Post> childrenPosts = new HashSet<>();
	
	public Post() {
		
	}

	public Post(LocalDateTime datePost, String content, User postedBy, Post parentPost) {
		this.datePost = datePost;
		this.content = content;
		this.postedBy = postedBy;
		this.parentPost = parentPost;
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public LocalDateTime getDatePost() {
		return datePost;
	}

	public void setDatePost(LocalDateTime datePost) {
		this.datePost = datePost;
	}

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}

	public User getPostedBy() {
		return postedBy;
	}

	public void setPostedBy(User postedBy) {
		this.postedBy = postedBy;
	}

	@JsonIgnore
	public Post getParentPost() {
		return parentPost;
	}

	public void setParentPost(Post parentPost) {
		this.parentPost = parentPost;
	}

	public Set<Post> getChildrenPosts() {
		return childrenPosts;
	}

	public void setChildrenPosts(Set<Post> childrenPosts) {
		this.childrenPosts = childrenPosts;
	}

	@JsonIgnore
	public Integer getPostedbyid() {
		return postedbyid;
	}

	public void setPostedbyid(Integer postedbyid) {
		this.postedbyid = postedbyid;
	}

	public Integer getParentpostid() {
		return parentpostid;
	}

	public void setParentpostid(Integer parentpostid) {
		this.parentpostid = parentpostid;
	}
	
}
