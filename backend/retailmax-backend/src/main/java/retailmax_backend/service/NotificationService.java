package retailmax_backend.service;

import retailmax_backend.entity.Notification;
import retailmax_backend.repository.NotificationRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class NotificationService {

    private final NotificationRepository notificationRepository;

    public NotificationService(
            NotificationRepository notificationRepository) {

        this.notificationRepository = notificationRepository;
    }

    public List<Notification> getAllNotifications() {
        return notificationRepository.findAll();
    }

    public Optional<Notification> getNotificationById(Long id) {
        return notificationRepository.findById(id);
    }

    public List<Notification> getUnreadNotifications() {
        return notificationRepository
                .findByIsReadFalseOrderByCreatedAtDesc();
    }

    public List<Notification> getNotificationsByType(String type) {
        return notificationRepository.findByType(
                type.toUpperCase()
        );
    }

    public List<Notification> getNotificationsByPriority(
            String priority) {

        return notificationRepository.findByPriority(
                priority.toUpperCase()
        );
    }

    public Notification createNotification(
            Notification notification) {

        if (notification.getType() == null ||
                notification.getType().isBlank()) {

            notification.setType("GENERAL");

        } else {
            notification.setType(
                    notification.getType().toUpperCase()
            );
        }

        if (notification.getPriority() == null ||
                notification.getPriority().isBlank()) {

            notification.setPriority("MEDIUM");

        } else {
            notification.setPriority(
                    notification.getPriority().toUpperCase()
            );
        }

        if (notification.getIsRead() == null) {
            notification.setIsRead(false);
        }

        return notificationRepository.save(notification);
    }

    public Notification markAsRead(Long id) {

        Notification notification =
                notificationRepository.findById(id)
                        .orElseThrow(
                                () -> new RuntimeException(
                                        "Notification not found"
                                )
                        );

        notification.setIsRead(true);

        return notificationRepository.save(notification);
    }

    public Notification markAsUnread(Long id) {

        Notification notification =
                notificationRepository.findById(id)
                        .orElseThrow(
                                () -> new RuntimeException(
                                        "Notification not found"
                                )
                        );

        notification.setIsRead(false);

        return notificationRepository.save(notification);
    }

    public void deleteNotification(Long id) {
        notificationRepository.deleteById(id);
    }
}