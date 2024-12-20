package com.metahive.OfficeService.repositories;

import com.metahive.OfficeService.entities.Admin;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AdminRepository extends JpaRepository<Admin, Long> {
}
