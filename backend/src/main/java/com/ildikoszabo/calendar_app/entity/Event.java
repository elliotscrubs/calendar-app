package com.ildikoszabo.calendar_app.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
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
    private BigInteger user_id;

    @Column(name="start_at", nullable = false)
    @JsonFormat(pattern="yyyy-MM-dd HH:mm:ss")
    private LocalDateTime start_at;

    @Column(name="end_at", nullable = false)
    @JsonFormat(pattern="yyyy-MM-dd HH:mm:ss")
    private LocalDateTime end_at;

    @Column(name="event_text", nullable = false)
    private String event_text;

    public Event() {

    }

    public Event(BigInteger id, BigInteger user_id, LocalDateTime start_at, LocalDateTime end_at, String event_text) {
        this.id = id;
        this.user_id = user_id;
        this.start_at = start_at;
        this.end_at = end_at;
        this.event_text = event_text;
    }

    public BigInteger getId() {
        return id;
    }

    public void setId(BigInteger id) {
        this.id = id;
    }

    public BigInteger getUser_id() {
        return user_id;
    }

    public void setUser_id(BigInteger user_id) {
        this.user_id = user_id;
    }

    public LocalDateTime getStart_at() {
        return start_at;
    }

    public void setStart_at(LocalDateTime start_at) {
        this.start_at = start_at;
    }

    public LocalDateTime getEnd_at() {
        return end_at;
    }

    public void setEnd_at(LocalDateTime end_at) {
        this.end_at = end_at;
    }

    public String getEvent_text() {
        return event_text;
    }

    public void setEvent_text(String event_text) {
        this.event_text = event_text;
    }

    @Override
    public String toString() {
        return "Events{" +
                "id=" + id +
                ", user_id=" + user_id +
                ", start_at=" + start_at +
                ", end_at=" + end_at +
                ", event_text=" + event_text +
                '}';
    }
}
