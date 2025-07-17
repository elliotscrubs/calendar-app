package com.ildikoszabo.calendar_app.entity;

import com.ildikoszabo.calendar_app.dto.EventRequestDto;
import jakarta.persistence.*;
import jakarta.validation.constraints.Size;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "events")
public class Event {

	@Id
	@GeneratedValue(strategy = GenerationType.UUID)
	@Column(name = "id", updatable = false, nullable = false)
	private UUID id;

	@Column(name = "user_id", nullable = false)
	private UUID userId; // Todo: do not return internal server error if missing from request

	@Column(name = "start_at", nullable = false)
	private LocalDateTime startAt;

	@Column(name = "end_at", nullable = false)
	private LocalDateTime endAt;

	@Column(name = "event_text", nullable = false)
	@Size(min = 5, max = 200, message = "The event text can be a minimum of 5 and a maximum of 200 characters long!!")
	private String eventText;

	public Event() {

	}

	public Event(EventRequestDto eventRequestDto, UUID userId) {
		this.userId = userId;
		this.startAt = eventRequestDto.startAt();
		this.endAt = eventRequestDto.endAt();
		this.eventText = eventRequestDto.eventText();
	}

	public Event(UUID id, UUID userId, LocalDateTime startAt, LocalDateTime endAt, String eventText) {
		this.id = id;
		this.userId = userId;
		this.startAt = startAt;
		this.endAt = endAt;
		this.eventText = eventText;
	}

	public UUID getId() {
		return id;
	}

	public void setId(UUID id) {
		this.id = id;
	}

	public UUID getUserId() {
		return userId;
	}

	public void setUserId(UUID userId) {
		this.userId = userId;
	}

	public LocalDateTime getStartAt() {
		return startAt;
	}

	public void setStartAt(LocalDateTime startAt) {
		this.startAt = startAt;
	}

	public LocalDateTime getEndAt() {
		return endAt;
	}

	public void setEndAt(LocalDateTime endAt) {
		this.endAt = endAt;
	}

	public String getEventText() {
		return eventText;
	}

	public void setEventText(String eventText) {
		this.eventText = eventText;
	}

	@Override
	public String toString() {
		return "Events{" +
				"Id=" + id +
				", userId=" + userId +
				", startAt=" + startAt +
				", endAt=" + endAt +
				", eventText=" + eventText +
				'}';
	}
}
