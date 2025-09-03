package com.main.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Employee {

    @Id
    @GeneratedValue
    private Long id;

    @NotBlank(message = "Enter Name!")
    private String name;
    
    @NotBlank(message = "Enter Email!")
    @Email(message = "Invalid email format")
    private String email;

    @Enumerated(EnumType.STRING)
    @NotNull(message = "Mention Department!")
    private Department department;

    @Min(value = 0, message = "Salary must be non-negative")
    private double salary;
}
