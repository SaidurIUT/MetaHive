package com.metahive.OfficeService.repositories;

import com.metahive.OfficeService.entities.Admin;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AdminRepository extends JpaRepository<Admin, Long> {
    List<Admin> findByOfficeId(Long officeId);
    boolean existsByUserIdAndOfficeId(String userId, Long officeId);
    void deleteByUserIdAndOfficeId(String userId, Long officeId);
    void deleteByOfficeId(Long officeId);
}
