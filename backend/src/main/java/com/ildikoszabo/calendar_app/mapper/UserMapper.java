package com.ildikoszabo.calendar_app.mapper;

import com.ildikoszabo.calendar_app.dto.UserProfileDto;
import com.ildikoszabo.calendar_app.entity.User;
import org.springframework.stereotype.Component;

@Component
public class UserMapper {
	public UserProfileDto toUserProfileDto(final User user) {
		return new UserProfileDto(user.getEmail(), user.getUsername());
	}
}