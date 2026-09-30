package retailmax_backend.controller;

import retailmax_backend.entity.UserAccount;
import retailmax_backend.service.UserAccountService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = {
        "http://localhost:3000",
        "http://localhost:5174",
        "http://localhost:5173"
})
public class UserAccountController {

    private final UserAccountService userService;

    public UserAccountController(
            UserAccountService userService) {

        this.userService = userService;
    }

    @GetMapping
    public List<UserAccount> getAllUsers() {
        return userService.getAllUsers();
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserAccount> getUserById(
            @PathVariable Long id) {

        return userService.getUserById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/role/{role}")
    public List<UserAccount> getUsersByRole(
            @PathVariable String role) {

        return userService.getUsersByRole(role);
    }

    @GetMapping("/status/{status}")
    public List<UserAccount> getUsersByStatus(
            @PathVariable String status) {

        return userService.getUsersByStatus(status);
    }

    @PostMapping
    public UserAccount createUser(
            @RequestBody UserAccount user) {

        return userService.createUser(user);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(
            @RequestBody UserLoginRequest request) {

        try {

            return ResponseEntity.ok(
                    userService.login(
                            request.getUsername(),
                            request.getPassword()
                    )
            );

        } catch (RuntimeException e) {

            return ResponseEntity
                    .status(401)
                    .body(e.getMessage());
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<UserAccount> updateUser(
            @PathVariable Long id,
            @RequestBody UserAccount user) {

        try {

            return ResponseEntity.ok(
                    userService.updateUser(
                            id,
                            user
                    )
            );

        } catch (RuntimeException e) {

            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<UserAccount> updateUserStatus(
            @PathVariable Long id,
            @RequestParam String status) {

        try {

            return ResponseEntity.ok(
                    userService.updateUserStatus(
                            id,
                            status
                    )
            );

        } catch (RuntimeException e) {

            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(
            @PathVariable Long id) {

        userService.deleteUser(id);

        return ResponseEntity.noContent().build();
    }

    public static class UserLoginRequest {

        private String username;
        private String password;

        public UserLoginRequest() {
        }

        public String getUsername() {
            return username;
        }

        public void setUsername(String username) {
            this.username = username;
        }

        public String getPassword() {
            return password;
        }

        public void setPassword(String password) {
            this.password = password;
        }
    }
}