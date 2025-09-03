package com.main.controller;

import java.util.List;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.main.entity.Department;
import com.main.entity.Employee;
import com.main.services.EmployeeService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/employees")
@RequiredArgsConstructor
public class EmployeeController {
    private final EmployeeService service;

    @GetMapping
    public List<Employee> getAll() {
        return service.getAll();
    }
    @GetMapping("/search")
    public List<Employee> searchEmployees(@RequestParam("q") String query) {
        return service.search(query);
    }
    
    @GetMapping("/departments")
    public Department[] getDepartments() {
        return Department.values();
    }

    @PostMapping
    public Employee create(@Valid @RequestBody Employee emp) {
        return service.save(emp);
    }

    @GetMapping("/{id}")
    public Employee getById(@PathVariable Long id) {
        return service.getById(id);
    }

    @PutMapping("/{id}")
    public Employee update(@PathVariable Long id,@Valid @RequestBody Employee emp) {
        return service.update(id, emp);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }
}
