package com.metahive.OfficeService.repositories;

import com.metahive.OfficeService.entities.Member;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MemberRepository extends JpaRepository<Member, Long> {
}