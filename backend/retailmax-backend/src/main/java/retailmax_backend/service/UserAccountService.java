package retailmax_backend.service;

import retailmax_backend.entity.UserAccount;
import retailmax_backend.repository.UserAccountRepository;
import org.springframework.stereotype.Service;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.util.List;
import java.util.Optional;

@Service
public class UserAccountService {

    private final UserAccountRepository userRepository;

    public UserAccountService(
            UserAccountRepository userRepository) {

        this.userRepository = userRepository;
    }

    public List<UserAccount> getAllUsers() {
        return userRepository.findAll();
    }

    public Optional<UserAccount> getUserById(Long id) {
        return userRepository.findById(id);
    }

    public List<UserAccount> getUsersByRole(String role) {

        return userRepository.findByRole(
                role.toUpperCase()
        );
    }

    public List<UserAccount> getUsersByStatus(String status) {

        return userRepository.findByStatus(
                status.toUpperCase()
        );
    }

    public UserAccount createUser(UserAccount user) {

        if (user.getRole() == null ||
                user.getRole().isBlank()) {

            user.setRole("SALES_USER");

        } else {
            user.setRole(
                    user.getRole().toUpperCase()
            );
        }

        if (user.getStatus() == null ||
                user.getStatus().isBlank()) {

            user.setStatus("ACTIVE");

        } else {
            user.setStatus(
                    user.getStatus().toUpperCase()
            );
        }

        return userRepository.save(user);
    }

    public UserAccount updateUser(
            Long id,
            UserAccount userDetails) {

        UserAccount user =
                userRepository.findById(id)
                        .orElseThrow(
                                () -> new RuntimeException(
                                        "User not found"
                                )
                        );

        user.setUsername(
                userDetails.getUsername()
        );

        user.setEmail(
                userDetails.getEmail()
        );

        user.setFullName(
                userDetails.getFullName()
        );

        user.setRole(
                userDetails.getRole()
        );

        user.setStatus(
                userDetails.getStatus()
        );

        if (userDetails.getPassword() != null &&
                !userDetails.getPassword().isBlank()) {

            user.setPassword(
                    userDetails.getPassword()
            );
        }

        if (user.getRole() != null) {
            user.setRole(
                    user.getRole().toUpperCase()
            );
        }

        if (user.getStatus() != null) {
            user.setStatus(
                    user.getStatus().toUpperCase()
            );
        }

        return userRepository.save(user);
    }

    public UserAccount updateUserStatus(
            Long id,
            String status) {

        UserAccount user =
                userRepository.findById(id)
                        .orElseThrow(
                                () -> new RuntimeException(
                                        "User not found"
                                )
                        );

        user.setStatus(
                status.toUpperCase()
        );

        return userRepository.save(user);
    }

    public UserAccount login(
            String username,
            String password) {

        UserAccount user =
                userRepository.findByUsername(username)
                        .orElseThrow(
                                () -> new RuntimeException(
                                        "Invalid username or password"
                                )
                        );

        if (!"ACTIVE".equalsIgnoreCase(
                user.getStatus())) {

            throw new RuntimeException(
                    "User account is inactive"
            );
        }

        String hashedPassword =
                hashPassword(password);

        if (!user.getPassword().equals(
                hashedPassword)) {

            throw new RuntimeException(
                    "Invalid username or password"
            );
        }

        return user;
    }

    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }

    private String hashPassword(
            String rawPassword) {

        try {

            MessageDigest digest =
                    MessageDigest.getInstance(
                            "SHA-256"
                    );

            byte[] hash =
                    digest.digest(
                            rawPassword.getBytes(
                                    StandardCharsets.UTF_8
                            )
                    );

            StringBuilder hexString =
                    new StringBuilder();

            for (byte b : hash) {

                String hex =
                        Integer.toHexString(
                                0xff & b
                        );

                if (hex.length() == 1) {
                    hexString.append('0');
                }

                hexString.append(hex);
            }

            return "HASHED:" + hexString;

        } catch (Exception e) {

            throw new RuntimeException(
                    "Password hashing failed"
            );
        }
    }
}