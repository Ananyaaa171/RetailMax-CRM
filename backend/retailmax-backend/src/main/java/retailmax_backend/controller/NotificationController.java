package retailmax_backend.controller;

import retailmax_backend.entity.Notification;
import retailmax_backend.service.NotificationService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/notifications")
@CrossOrigin(origins = {
        "http://localhost:3000",
        "http://localhost:5174",
        "http://localhost:5173"
})
public class NotificationController {

    private final NotificationService notificationService;

    public NotificationController(
            NotificationService notificationService) {

        this.notificationService = notificationService;
    }

    @GetMapping
    public List<Notification> getAllNotifications() {
        return notificationService.getAllNotifications();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Notification> getNotificationById(
            @PathVariable Long id) {

        return notificationService.getNotificationById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/unread")
    public List<Notification> getUnreadNotifications() {
        return notificationService.getUnreadNotifications();
    }

    @GetMapping("/type/{type}")
    public List<Notification> getNotificationsByType(
            @PathVariable String type) {

        return notificationService.getNotificationsByType(type);
    }

    @GetMapping("/priority/{priority}")
    public List<Notification> getNotificationsByPriority(
            @PathVariable String priority) {

        return notificationService
                .getNotificationsByPriority(priority);
    }

    @PostMapping
    public Notification createNotification(
            @RequestBody Notification notification) {

        return notificationService.createNotification(notification);
    }

    @PutMapping("/{id}/read")
    public ResponseEntity<Notification> markAsRead(
            @PathVariable Long id) {

        try {
            return ResponseEntity.ok(
                    notificationService.markAsRead(id)
            );
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/{id}/unread")
    public ResponseEntity<Notification> markAsUnread(
            @PathVariable Long id) {

        try {
            return ResponseEntity.ok(
                    notificationService.markAsUnread(id)
            );
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteNotification(
            @PathVariable Long id) {

        notificationService.deleteNotification(id);

        return ResponseEntity.noContent().build();
    }
}