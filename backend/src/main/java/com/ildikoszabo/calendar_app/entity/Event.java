package com.ildikoszabo.calendar_app.entity;

import jakarta.persistence.*;
import java.math.BigInteger;
import java.time.LocalDateTime;

@Entity
@Table(name="events")
public class Event {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id")
    private BigInteger id;

    @Column(name="user_id", nullable = false)
    private BigInteger userId;

    @Column(name="start_at", nullable = false)
    private LocalDateTime startAt;

    @Column(name="end_at", nullable = false)
    private LocalDateTime endAt;

    @Column(name="event_text", nullable = false)
    private String eventText;

    public Event() {

    }

    public Event(BigInteger id, BigInteger userId, LocalDateTime startAt, LocalDateTime endAt, String eventText) {
        this.id = id;
        this.userId = userId;
        this.startAt = startAt;
        this.endAt = endAt;
        this.eventText = eventText;
    }

    public BigInteger getId() {
        return id;
    }

    public void setId(BigInteger id) {
        this.id = id;
    }

    public BigInteger getUserId() {
        return userId;
    }

    public void setUserId(BigInteger userId) {
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
