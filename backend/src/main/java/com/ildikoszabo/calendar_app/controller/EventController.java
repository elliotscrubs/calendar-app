package com.ildikoszabo.calendar_app.controller;

import com.ildikoszabo.calendar_app.entity.Event;
import com.ildikoszabo.calendar_app.service.EventService;
import jakarta.validation.Valid;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;
import java.util.Optional;
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
		if (event.getId() != null) {
			return ResponseEntity.badRequest().body("Event ID must be empty for creation.");
		}

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

	@DeleteMapping("/{id}")
	public ResponseEntity<String> deleteById(@PathVariable("id") UUID id) {
		Optional<Event> existingEvent = this.eventService.findById(id);
		if (existingEvent.isPresent()) {
			this.eventService.deleteById(existingEvent.get().getId());
			return ResponseEntity.ok().build();
		}
		return ResponseEntity.notFound().build();
	}

	@PatchMapping("/{id}")
	public ResponseEntity<?> update(@PathVariable UUID id, @RequestBody Event updates) {
		Optional<Event> optionalEvent = eventService.findById(id);

		if (optionalEvent.isPresent()) {
			Event event = optionalEvent.get();
			event.setStartAt(updates.getStartAt());
			event.setEndAt(updates.getEndAt());
			event.setEventText(updates.getEventText());
			eventService.save(event);
			return ResponseEntity.ok(event);
		} else {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Event not found");
		}
	}
}