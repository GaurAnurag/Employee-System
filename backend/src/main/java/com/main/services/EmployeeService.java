package com.main.services;

import java.util.List;

import org.springframework.stereotype.Service;

import com.main.entity.Department;
import com.main.entity.Employee;
import com.main.repository.EmployeeRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class EmployeeService {
    private final EmployeeRepository repo;

    public List<Employee> getAll() {
        return repo.findAll();
    }
    
    public List<Employee> search(String keyword) {
        return repo.searchByNameOrEmail(keyword);
    }

    public Employee getById(Long id) {
        return repo.findById(id).orElseThrow(() -> new RuntimeException("Employee not found"));
    }

    public Employee save(Employee emp) {
        return repo.save(emp);
    }
    
    public Department[] getDepartments() {
        return Department.values();
    }

    public Employee update(Long id, Employee emp) {
        Employee existing = getById(id);
        existing.setName(emp.getName());
        existing.setDepartment(emp.getDepartment());
        existing.setSalary(emp.getSalary());
        return repo.save(existing);
    }

    public void delete(Long id) {
        repo.deleteById(id);
    }
}
