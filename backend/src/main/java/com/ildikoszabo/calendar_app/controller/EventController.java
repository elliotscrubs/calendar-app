package com.ildikoszabo.calendar_app.controller;

import com.ildikoszabo.calendar_app.entity.Event;
import com.ildikoszabo.calendar_app.service.EventService;
import jakarta.validation.Valid;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import java.util.Date;


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

    @GetMapping("/events/{userId}")
    public Event lists(@PathVariable @DateTimeFormat(pattern = "yyyy-MM-dd") Date startDate,
                       @PathVariable @DateTimeFormat(pattern = "yyyy-MM-dd") Date endDate) {

    }
}