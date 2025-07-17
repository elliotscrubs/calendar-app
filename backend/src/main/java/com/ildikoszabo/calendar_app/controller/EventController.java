package com.ildikoszabo.calendar_app.controller;

import com.ildikoszabo.calendar_app.dto.EventRequestDto;
import com.ildikoszabo.calendar_app.entity.Event;
import com.ildikoszabo.calendar_app.service.EventService;
import com.ildikoszabo.calendar_app.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import java.time.LocalDate;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/events")
@RequiredArgsConstructor
public class EventController {
	private final EventService eventService;
	private final UserService userService;

	@PostMapping
	public ResponseEntity<?> saveEvent(@Valid @RequestBody EventRequestDto event, BindingResult result, Authentication authentication) {
		if (result.hasErrors()) {
			return ResponseEntity.badRequest().body(result.getAllErrors());
		}
		final var userId =
				userService.getUserByUsername(authentication.getName()).getId();
		final var savedEvent = eventService.save(event, userId);
		return ResponseEntity.ok(savedEvent);
	}

	@RequestMapping(method = RequestMethod.OPTIONS)
	public void handleOptions() {

	}

	@GetMapping("/byDate")
	public ResponseEntity<Map<LocalDate, List<Event>>> getListByDate(
			@RequestParam @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate fromDate,
			@RequestParam @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate toDate,
			Authentication authentication) {
		final var userId =
				userService.getUserByUsername(authentication.getName()).getId();
		Map<LocalDate, List<Event>> allEvents = eventService.getListByDate(fromDate, toDate, userId);
		return ResponseEntity.ok(allEvents);
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<String> deleteById(@PathVariable("id") UUID id, Authentication authentication) {
		Optional<Event> existingEvent = this.eventService.findById(id);
		final var userId =
				userService.getUserByUsername(authentication.getName()).getId();

		if (existingEvent.isPresent()) {
			if (!existingEvent.get().getUserId().equals(userId)) {
				return ResponseEntity.notFound().build();
			}
			this.eventService.deleteById(existingEvent.get().getId());
			return ResponseEntity.ok().build();
		}
		return ResponseEntity.notFound().build();
	}

	@PatchMapping("/{id}")
	public ResponseEntity<?> update(@PathVariable UUID id, @RequestBody Event updates, Authentication authentication) {
		Optional<Event> optionalEvent = eventService.findById(id);
		final var userId =
				userService.getUserByUsername(authentication.getName()).getId();

		if (optionalEvent.isPresent()) {
			if (!optionalEvent.get().getUserId().equals(userId)) {
				return ResponseEntity.notFound().build();
			}
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