package com.ildikoszabo.calendar_app.service;

import com.ildikoszabo.calendar_app.entity.User;
import com.ildikoszabo.calendar_app.repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import jakarta.validation.ValidationException;

@Service
@RequiredArgsConstructor
public class UserRegistrationService {

	private final UserRepository userRepository;
	private final PasswordEncoder passwordEncoder;

	@Transactional
	public User registerUser(User user) {
		if (userRepository.existsByUsername(user.getUsername()) ||
				userRepository.existsByEmail(user.getEmail())) {

			throw new ValidationException("Username or Email already exists");
		}

		user.setPassword(passwordEncoder.encode(user.getPassword()));
		return userRepository.save(user);
	}
}