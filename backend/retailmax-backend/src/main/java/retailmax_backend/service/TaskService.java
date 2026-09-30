package retailmax_backend.service;

import retailmax_backend.entity.Task;
import retailmax_backend.repository.TaskRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TaskService {

    private final TaskRepository taskRepository;

    public TaskService(TaskRepository taskRepository) {
        this.taskRepository = taskRepository;
    }

    // Get all tasks
    public List<Task> getAllTasks() {
        return taskRepository.findAll();
    }

    // Get task by ID
    public Optional<Task> getTaskById(Long id) {
        return taskRepository.findById(id);
    }

    // Get tasks by customer
    public List<Task> getTasksByCustomerId(Long customerId) {
        return taskRepository.findByCustomerId(customerId);
    }

    // Get tasks by deal
    public List<Task> getTasksByDealId(Long dealId) {
        return taskRepository.findByDealId(dealId);
    }

    // Get tasks by status
    public List<Task> getTasksByStatus(String status) {
        return taskRepository.findByStatus(status.toUpperCase());
    }

    // Get tasks by priority
    public List<Task> getTasksByPriority(String priority) {
        return taskRepository.findByPriority(priority.toUpperCase());
    }

    // Create task
    public Task createTask(Task task) {

        if (task.getStatus() == null || task.getStatus().isBlank()) {
            task.setStatus("PENDING");
        } else {
            task.setStatus(task.getStatus().toUpperCase());
        }

        if (task.getPriority() == null || task.getPriority().isBlank()) {
            task.setPriority("MEDIUM");
        } else {
            task.setPriority(task.getPriority().toUpperCase());
        }

        if (task.getTaskType() == null || task.getTaskType().isBlank()) {
            task.setTaskType("FOLLOW_UP");
        } else {
            task.setTaskType(task.getTaskType().toUpperCase());
        }

        return taskRepository.save(task);
    }

    // Update task
    public Task updateTask(Long id, Task taskDetails) {

        Task task = taskRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Task not found"));

        task.setTitle(taskDetails.getTitle());
        task.setDescription(taskDetails.getDescription());
        task.setTaskType(taskDetails.getTaskType());
        task.setStatus(taskDetails.getStatus());
        task.setPriority(taskDetails.getPriority());
        task.setDueDate(taskDetails.getDueDate());
        task.setCustomerId(taskDetails.getCustomerId());
        task.setDealId(taskDetails.getDealId());

        if (task.getStatus() != null) {
            task.setStatus(task.getStatus().toUpperCase());
        }

        if (task.getPriority() != null) {
            task.setPriority(task.getPriority().toUpperCase());
        }

        if (task.getTaskType() != null) {
            task.setTaskType(task.getTaskType().toUpperCase());
        }

        return taskRepository.save(task);
    }

    // Mark task as completed
    public Task completeTask(Long id) {

        Task task = taskRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Task not found"));

        task.setStatus("COMPLETED");

        return taskRepository.save(task);
    }

    // Delete task
    public void deleteTask(Long id) {
        taskRepository.deleteById(id);
    }
}