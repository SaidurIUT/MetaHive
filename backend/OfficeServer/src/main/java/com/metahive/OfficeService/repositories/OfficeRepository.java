package com.metahive.OfficeService.repositories;

import com.metahive.OfficeService.entities.Office;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OfficeRepository extends JpaRepository<Office, Long> {
}