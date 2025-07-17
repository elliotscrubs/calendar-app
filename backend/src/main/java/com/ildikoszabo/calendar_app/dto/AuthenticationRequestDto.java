package com.ildikoszabo.calendar_app.dto;

public record AuthenticationRequestDto(
		String username,
		String password
) {
}