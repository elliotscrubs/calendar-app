package com.ildikoszabo.calendar_app.dto;

public record RegistrationRequestDto(
		String username,
		String email,
		String password
) {
}