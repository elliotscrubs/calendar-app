package com.ildikoszabo.calendar_app.mapper;

import com.ildikoszabo.calendar_app.dto.RegistrationRequestDto;
import com.ildikoszabo.calendar_app.dto.RegistrationResponseDto;
import com.ildikoszabo.calendar_app.entity.User;
import org.springframework.stereotype.Component;

@Component
public class UserRegistrationMapper {

	public User toEntity(RegistrationRequestDto registrationRequestDto) {
		final var user = new User();

		user.setEmail(registrationRequestDto.email());
		user.setUsername(registrationRequestDto.username());
		user.setPassword(registrationRequestDto.password());

		return user;
	}

	public RegistrationResponseDto toRegistrationResponseDto(
			final User user) {

		return new RegistrationResponseDto(
				user.getEmail(), user.getUsername());
	}

}