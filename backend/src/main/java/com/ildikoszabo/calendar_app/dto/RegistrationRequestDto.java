package com.ildikoszabo.calendar_app.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public record RegistrationRequestDto(
		@NotBlank(message = "Username cannot be empty")
		String username,

		@NotBlank(message = "Email cannot be empty")
		@Email(message = "Incorrect email format")
		String email,

		@NotBlank(message = "Password cannot be empty")
		String password
) {
}