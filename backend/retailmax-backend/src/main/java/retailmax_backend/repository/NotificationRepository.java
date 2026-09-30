package retailmax_backend.repository;

import retailmax_backend.entity.Notification;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface NotificationRepository
        extends JpaRepository<Notification, Long> {

    List<Notification> findByIsReadFalseOrderByCreatedAtDesc();

    List<Notification> findByType(String type);

    List<Notification> findByPriority(String priority);
}