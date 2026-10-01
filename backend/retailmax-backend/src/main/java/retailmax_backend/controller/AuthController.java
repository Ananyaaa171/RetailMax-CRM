package retailmax_backend.controller;

import retailmax_backend.entity.AuthUser;
import retailmax_backend.repository.AuthUserRepository;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(
        origins = {
                "http://localhost:5173",
                "http://localhost:3000"
        }
)
public class AuthController {


    // =====================================================
    // DEPENDENCIES
    // =====================================================

    private final AuthUserRepository userRepository;

    private final BCryptPasswordEncoder passwordEncoder =
            new BCryptPasswordEncoder();


    // =====================================================
    // CONSTRUCTOR
    // =====================================================

    public AuthController(
            AuthUserRepository userRepository
    ) {

        this.userRepository =
                userRepository;
    }


    // =====================================================
    // REGISTER
    // =====================================================

    @PostMapping("/register")
    public ResponseEntity<?> register(
            @RequestBody RegisterRequest request
    ) {

        /*
         * Clean incoming values
         */

        String username =
                clean(request.username());

        String email =
                clean(request.email())
                        .toLowerCase();

        String fullName =
                clean(request.fullName());


        /*
         * Check required fields
         */

        if (
                username.isBlank()
                        ||
                email.isBlank()
                        ||
                fullName.isBlank()
                        ||
                request.password() == null
        ) {

            return ResponseEntity
                    .badRequest()
                    .body(
                            Map.of(
                                    "message",
                                    "Please complete all required fields."
                            )
                    );
        }


        /*
         * Validate password length
         */

        if (
                request.password().length() < 6
        ) {

            return ResponseEntity
                    .badRequest()
                    .body(
                            Map.of(
                                    "message",
                                    "Password must contain at least 6 characters."
                            )
                    );
        }


        /*
         * Validate email
         */

        if (
                !email.matches(
                        "^\\S+@\\S+\\.\\S+$"
                )
        ) {

            return ResponseEntity
                    .badRequest()
                    .body(
                            Map.of(
                                    "message",
                                    "Please enter a valid email address."
                            )
                    );
        }


        /*
         * Check duplicate username
         */

        if (
                userRepository
                        .existsByUsername(username)
        ) {

            return ResponseEntity
                    .status(
                            HttpStatus.CONFLICT
                    )
                    .body(
                            Map.of(
                                    "message",
                                    "Username already exists."
                            )
                    );
        }


        /*
         * Check duplicate email
         */

        if (
                userRepository
                        .existsByEmail(email)
        ) {

            return ResponseEntity
                    .status(
                            HttpStatus.CONFLICT
                    )
                    .body(
                            Map.of(
                                    "message",
                                    "Email already exists."
                            )
                    );
        }


        // =================================================
        // CREATE USER
        // =================================================

        AuthUser user =
                new AuthUser();


        user.setUsername(
                username
        );


        user.setEmail(
                email
        );


        user.setFullName(
                fullName
        );


        /*
         * NEVER store the plain password.
         *
         * BCrypt converts:
         *
         * password123
         *
         * into a secure hash.
         */

        user.setPassword(
                passwordEncoder.encode(
                        request.password()
                )
        );


        /*
         * Default role
         */

        user.setRole(
                "SALES_USER"
        );


        /*
         * New accounts are active
         */

        user.setStatus(
                "ACTIVE"
        );


        /*
         * Save to PostgreSQL
         */

        userRepository.save(
                user
        );


        /*
         * Registration response
         */

        return ResponseEntity
                .status(
                        HttpStatus.CREATED
                )
                .body(
                        Map.of(
                                "message",
                                "Account created successfully."
                        )
                );
    }


    // =====================================================
    // LOGIN
    // =====================================================

    @PostMapping("/login")
    public ResponseEntity<?> login(
            @RequestBody LoginRequest request
    ) {


        /*
         * Validate request
         */

        if (
                request.username() == null
                        ||
                request.password() == null
        ) {

            return ResponseEntity
                    .badRequest()
                    .body(
                            Map.of(
                                    "message",
                                    "Username and password are required."
                            )
                    );
        }


        /*
         * Find user
         */

        AuthUser user =
                userRepository
                        .findByUsername(
                                request.username()
                                        .trim()
                        )
                        .orElse(null);


        /*
         * Invalid username
         */

        if (
                user == null
        ) {

            return ResponseEntity
                    .status(
                            HttpStatus.UNAUTHORIZED
                    )
                    .body(
                            Map.of(
                                    "message",
                                    "Invalid username or password."
                            )
                    );
        }


        /*
         * Check password
         */

        boolean passwordMatches =
                passwordEncoder.matches(
                        request.password(),
                        user.getPassword()
                );


        /*
         * Invalid password
         */

        if (
                !passwordMatches
        ) {

            return ResponseEntity
                    .status(
                            HttpStatus.UNAUTHORIZED
                    )
                    .body(
                            Map.of(
                                    "message",
                                    "Invalid username or password."
                            )
                    );
        }


        /*
         * Check account status
         */

        if (
                !"ACTIVE".equalsIgnoreCase(
                        user.getStatus()
                )
        ) {

            return ResponseEntity
                    .status(
                            HttpStatus.FORBIDDEN
                    )
                    .body(
                            Map.of(
                                    "message",
                                    "This account is inactive."
                            )
                    );
        }


        // =================================================
        // CREATE SESSION TOKEN
        // =================================================

        /*
         * This token is stored by the frontend.
         *
         * It identifies the current authenticated session
         * for the CRM frontend.
         */

        String token =
                UUID.randomUUID()
                        .toString();


        // =================================================
        // LOGIN RESPONSE
        // =================================================

        return ResponseEntity
                .ok()
                .body(
                        Map.of(

                                "token",
                                token,

                                "user",
                                Map.of(

                                        "id",
                                        user.getId(),

                                        "username",
                                        user.getUsername(),

                                        "email",
                                        user.getEmail(),

                                        "fullName",
                                        user.getFullName(),

                                        "role",
                                        user.getRole()
                                )
                        )
                );
    }


    // =====================================================
    // UTILITY
    // =====================================================

    private String clean(
            String value
    ) {

        if (
                value == null
        ) {

            return "";
        }

        return value.trim();
    }


    // =====================================================
    // LOGIN REQUEST
    // =====================================================

    public record LoginRequest(

            String username,

            String password

    ) {
    }


    // =====================================================
    // REGISTER REQUEST
    // =====================================================

    public record RegisterRequest(

            String username,

            String email,

            String fullName,

            String password

    ) {
    }

}