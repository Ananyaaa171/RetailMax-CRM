package retailmax_backend.controller;

import retailmax_backend.entity.Task;
import retailmax_backend.service.TaskService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tasks")
@CrossOrigin(origins = {
        "http://localhost:3000",
        "http://localhost:5174",
        "http://localhost:5173"
})
public class TaskController {

    private final TaskService taskService;

    public TaskController(TaskService taskService) {
        this.taskService = taskService;
    }

    // Get all tasks
    @GetMapping
    public List<Task> getAllTasks() {
        return taskService.getAllTasks();
    }

    // Get task by ID
    @GetMapping("/{id}")
    public ResponseEntity<Task> getTaskById(@PathVariable Long id) {

        return taskService.getTaskById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // Get tasks by customer
    @GetMapping("/customer/{customerId}")
    public List<Task> getTasksByCustomerId(
            @PathVariable Long customerId) {

        return taskService.getTasksByCustomerId(customerId);
    }

    // Get tasks by deal
    @GetMapping("/deal/{dealId}")
    public List<Task> getTasksByDealId(
            @PathVariable Long dealId) {

        return taskService.getTasksByDealId(dealId);
    }

    // Get tasks by status
    @GetMapping("/status/{status}")
    public List<Task> getTasksByStatus(
            @PathVariable String status) {

        return taskService.getTasksByStatus(status);
    }

    // Get tasks by priority
    @GetMapping("/priority/{priority}")
    public List<Task> getTasksByPriority(
            @PathVariable String priority) {

        return taskService.getTasksByPriority(priority);
    }

    // Create task
    @PostMapping
    public Task createTask(@RequestBody Task task) {
        return taskService.createTask(task);
    }

    // Update task
    @PutMapping("/{id}")
    public ResponseEntity<Task> updateTask(
            @PathVariable Long id,
            @RequestBody Task task) {

        try {
            return ResponseEntity.ok(
                    taskService.updateTask(id, task)
            );
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    // Mark task as completed
    @PutMapping("/{id}/complete")
    public ResponseEntity<Task> completeTask(
            @PathVariable Long id) {

        try {
            return ResponseEntity.ok(
                    taskService.completeTask(id)
            );
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    // Delete task
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTask(
            @PathVariable Long id) {

        taskService.deleteTask(id);

        return ResponseEntity.noContent().build();
    }
}