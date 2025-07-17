package com.ildikoszabo.calendar_app.dto;
import java.time.LocalDateTime;

public record EventRequestDto(
		LocalDateTime startAt,
		LocalDateTime endAt,
		String eventText
) {
}
