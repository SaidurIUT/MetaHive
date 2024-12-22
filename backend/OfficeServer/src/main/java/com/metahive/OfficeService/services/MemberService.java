package com.metahive.OfficeService.services;


import com.metahive.OfficeService.payloads.MemberDTO;

import java.util.List;

public interface MemberService {
    MemberDTO addMemberToOffice(MemberDTO memberDTO);
    List<MemberDTO> getAllMembers();
    List<MemberDTO> getAllMembersByOfficeId(Long officeId);
    Boolean isMemberExistInThisOffice(MemberDTO memberDTO) ;
    void removeMemberByOfficeId(Long id);
    void removeAdminByUserIdAndOfficeId(String userId, Long officeId);
}