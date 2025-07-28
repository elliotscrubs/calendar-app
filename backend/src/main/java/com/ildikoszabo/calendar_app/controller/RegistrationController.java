package com.ildikoszabo.calendar_app.controller;

import com.ildikoszabo.calendar_app.dto.RegistrationRequestDto;
import com.ildikoszabo.calendar_app.dto.RegistrationResponseDto;
import com.ildikoszabo.calendar_app.mapper.UserRegistrationMapper;
import com.ildikoszabo.calendar_app.service.UserRegistrationService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class RegistrationController {

	private final UserRegistrationService userRegistrationService;

	private final UserRegistrationMapper userRegistrationMapper;

	@PostMapping("/register")
	public ResponseEntity<RegistrationResponseDto> registerUser(
			@Valid @RequestBody final RegistrationRequestDto registrationDTO) {

		final var registeredUser = userRegistrationService
				.registerUser(userRegistrationMapper.toEntity(registrationDTO));

		return ResponseEntity.ok(
				userRegistrationMapper.toRegistrationResponseDto(registeredUser)
		);
	}
}