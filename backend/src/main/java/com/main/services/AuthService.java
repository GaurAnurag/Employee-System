package com.main.services;

import com.main.dto.JwtResponse;
import com.main.dto.LoginRequest;
import com.main.dto.RegisterRequest;
import com.main.entity.PasswordResetToken;
import com.main.entity.User;
import com.main.repository.PasswordResetTokenRepository;
import com.main.repository.UserRepository;
import com.main.security.JwtTokenProvider;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class AuthService {

	private final UserRepository userRepo;
	private final PasswordResetTokenRepository tokenRepository;
	private final PasswordEncoder passwordEncoder;
	private final AuthenticationManager authManager;
	private final JwtTokenProvider jwtTokenProvider;
	private final EmailService emailService;

	public String register(RegisterRequest request) {
		if (userRepo.existsByEmail(request.getEmail())) {
			throw new RuntimeException("Email already taken.");
		}

		User user = new User();
		user.setEmail(request.getEmail());
		user.setUsername(request.getUsername());
		user.setPassword(passwordEncoder.encode(request.getPassword()));
		userRepo.save(user);

		return "User registered successfully";
	}

	public JwtResponse login(LoginRequest request) {
		Authentication authentication = authManager
				.authenticate(new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword()));

		String token = jwtTokenProvider.generateToken(authentication);
		return new JwtResponse(token);
	}
	
	@Transactional
	public void generateResetToken(String email) {
		User user = userRepo.findByEmail(email).orElseThrow(() -> new RuntimeException("User not found"));
		tokenRepository.deleteByEmail(email);
		String token = UUID.randomUUID().toString();
		PasswordResetToken resetToken = new PasswordResetToken();
		resetToken.setToken(token);
		resetToken.setEmail(email);
		resetToken.setExpirationTime(LocalDateTime.now().plusHours(1));
		tokenRepository.save(resetToken);
		String resetLink = "http://localhost:5173/reset-password?token=" + token;
		String subject = "Password Reset Request";
		String body = "Hi " + user.getUsername() + ",\n\nClick the link below to reset your password:\n" + resetLink
				+ "\n\nThis link will expire in 1 hour.";
		emailService.send(email, subject, body);
	}
	
	@Transactional
	public void resetPassword(String token, String newPassword) {
		PasswordResetToken resetToken = tokenRepository.findByToken(token)
				.orElseThrow(() -> new RuntimeException("Invalid token"));

		if (resetToken.getExpirationTime().isBefore(LocalDateTime.now())) {
			throw new RuntimeException("Token expired");
		}

		User user = userRepo.findByEmail(resetToken.getEmail())
				.orElseThrow(() -> new RuntimeException("User not found"));

		user.setPassword(passwordEncoder.encode(newPassword));
		userRepo.save(user);

		tokenRepository.delete(resetToken);
	}
}
