package com.metahive.OfficeService.repositories;

import com.metahive.OfficeService.entities.Member;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface MemberRepository extends JpaRepository<Member, Long> {
    List<Member> findByOfficeOfficeId(Long officeId);
    Optional<Member> findByUserIdAndOfficeOfficeId(String userId, Long officeId);
    boolean existsByUserIdAndOfficeOfficeId(String userId, Long officeId);
    void deleteByOfficeOfficeId(Long officeId);
}