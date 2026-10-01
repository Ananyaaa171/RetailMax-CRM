package retailmax_backend.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "auth_users")
public class AuthUser {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(
        nullable = false,
        unique = true,
        length = 80
    )
    private String username;

    @Column(
        nullable = false,
        unique = true,
        length = 180
    )
    private String email;

    @Column(
        nullable = false,
        length = 160
    )
    private String fullName;

    @Column(
        nullable = false,
        length = 255
    )
    private String password;

    @Column(
        nullable = false,
        length = 40
    )
    private String role = "SALES_USER";

    @Column(
        nullable = false,
        length = 30
    )
    private String status = "ACTIVE";


    // =====================================================
    // CONSTRUCTOR
    // =====================================================

    public AuthUser() {
    }


    // =====================================================
    // GETTERS
    // =====================================================

    public Long getId() {
        return id;
    }


    public String getUsername() {
        return username;
    }


    public String getEmail() {
        return email;
    }


    public String getFullName() {
        return fullName;
    }


    public String getPassword() {
        return password;
    }


    public String getRole() {
        return role;
    }


    public String getStatus() {
        return status;
    }


    // =====================================================
    // SETTERS
    // =====================================================

    public void setUsername(String username) {
        this.username = username;
    }


    public void setEmail(String email) {
        this.email = email;
    }


    public void setFullName(String fullName) {
        this.fullName = fullName;
    }


    public void setPassword(String password) {
        this.password = password;
    }


    public void setRole(String role) {
        this.role = role;
    }


    public void setStatus(String status) {
        this.status = status;
    }
}