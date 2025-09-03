package com.main.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import com.main.entity.Employee;

public interface EmployeeRepository extends JpaRepository<Employee, Long> {
	 @Query("SELECT e FROM Employee e WHERE LOWER(e.name) LIKE LOWER(CONCAT('%', :keyword, '%')) OR LOWER(e.email) LIKE LOWER(CONCAT('%', :keyword, '%'))")
	    List<Employee> searchByNameOrEmail(@Param("keyword") String keyword);
	
}
