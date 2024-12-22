package com.metahive.OfficeService.repositories;

import com.metahive.OfficeService.entities.Member;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface MemberRepository extends JpaRepository<Member, Long> {
    List<Member> findByOfficeId(Long officeId);
    Optional<Member> findByUserIdAndOfficeId(String userId, Long officeId);
    boolean existsByUserIdAndOfficeId(String userId, Long officeId);
    void deleteByUserIdAndOfficeId(String userId, Long officeId);
    void deleteByOfficeId(Long officeId);
}