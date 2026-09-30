package retailmax_backend.repository;

import retailmax_backend.entity.UserAccount;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface UserAccountRepository
        extends JpaRepository<UserAccount, Long> {

    Optional<UserAccount> findByUsername(String username);

    Optional<UserAccount> findByEmail(String email);

    List<UserAccount> findByRole(String role);

    List<UserAccount> findByStatus(String status);
}