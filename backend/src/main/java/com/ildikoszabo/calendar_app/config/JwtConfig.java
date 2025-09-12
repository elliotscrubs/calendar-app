package com.ildikoszabo.calendar_app.config;

import com.ildikoszabo.calendar_app.service.JwtService;
import com.nimbusds.jose.jwk.JWKSet;
import com.nimbusds.jose.jwk.RSAKey;
import com.nimbusds.jose.jwk.source.ImmutableJWKSet;
import lombok.Getter;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.oauth2.core.OAuth2TokenValidator;
import org.springframework.security.oauth2.jwt.*;
import java.security.interfaces.RSAPrivateKey;
import java.security.interfaces.RSAPublicKey;
import java.time.Duration;

@Configuration
@Setter
@Getter
@ConfigurationProperties(prefix = "jwt")
public class JwtConfig {

	private RSAPrivateKey privateKey;

	private RSAPublicKey publicKey;

	private Duration ttl;

	@Bean
	public JwtEncoder jwtEncoder() {
		final var jwk = new RSAKey.Builder(publicKey)
				.privateKey(privateKey).build();

		return new NimbusJwtEncoder(
				new ImmutableJWKSet<>(new JWKSet(jwk)));
	}

	@Bean
	public JwtDecoder jwtDecoder() {
		String issuer = "calendar-app";
		NimbusJwtDecoder jwtDecoder = NimbusJwtDecoder.withPublicKey(publicKey).build();
		OAuth2TokenValidator<Jwt> withIssuer = JwtValidators.createDefaultWithIssuer(issuer);
		jwtDecoder.setJwtValidator(withIssuer);

		return jwtDecoder;
	}

	@Bean
	public JwtService jwtService(
			@Value("${spring.application.name}") String appName,
			final JwtEncoder jwtEncoder) {

		return new JwtService(appName, ttl, jwtEncoder);
	}
}