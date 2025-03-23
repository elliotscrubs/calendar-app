package com.ildikoszabo.calendar_app.controller;

import com.ildikoszabo.calendar_app.entity.Event;
import com.ildikoszabo.calendar_app.service.EventService;
import jakarta.validation.Valid;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;
import java.util.UUID;


@RestController
@RequestMapping("/events")
public class EventController {
    private final EventService eventService;

    public EventController(EventService eventService) {
        this.eventService = eventService;
    }

    @PostMapping
    public ResponseEntity<?> saveEvent(@Valid @RequestBody Event event, BindingResult result) {
        if (result.hasErrors()) {
            return ResponseEntity.badRequest().body(result.getAllErrors());
        }

        eventService.save(event);
        return ResponseEntity.ok(event);
    }

    @RequestMapping(method = RequestMethod.OPTIONS)
    public void handleOptions() {

    }

    @GetMapping("/byDate")
    public ResponseEntity<Map<LocalDate, List<Event>>> getListByDate(
            @RequestParam @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate fromDate,
            @RequestParam @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate toDate,
            @RequestParam UUID userId) {
        Map<LocalDate, List<Event>> allEvents = eventService.getListByDate(fromDate, toDate, userId);
        return ResponseEntity.ok(allEvents);
    }
}