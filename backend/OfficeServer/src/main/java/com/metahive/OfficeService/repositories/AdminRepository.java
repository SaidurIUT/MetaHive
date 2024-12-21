package com.metahive.OfficeService.repositories;

import com.metahive.OfficeService.entities.Admin;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AdminRepository extends JpaRepository<Admin, Long> {
    List<Admin> findByOfficeOfficeId(Long officeId);
    boolean existsByUserIdAndOfficeOfficeId(String userId, Long officeId);
    void deleteByUserIdAndOfficeOfficeId(String userId, Long officeId);
    void deleteByOfficeOfficeId(Long officeId);
}
