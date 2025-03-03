package com.ildikoszabo.calendar_app.controller;

import com.ildikoszabo.calendar_app.entity.Event;
import com.ildikoszabo.calendar_app.service.EventService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/events")
public class EventController {
    private EventService eventService;

    public EventController(EventService eventService) {
        this.eventService = eventService;
    }

    @PostMapping("/save")
    public ResponseEntity<String> saveEvent(@RequestBody Event theEvent) {


        System.out.println(theEvent);

        // save the event
        eventService.save(theEvent);

        return ResponseEntity.ok("redirect:/events/save");
    }
}