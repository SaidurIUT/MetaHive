package com.metahive.OfficeService.services;


import com.metahive.OfficeService.payloads.MemberDTO;

import java.util.List;

public interface MemberService {
    MemberDTO addMember(MemberDTO memberDTO);
    MemberDTO getMemberById(Long id);
    List<MemberDTO> getAllMembers();
    void removeMember(Long id);
}