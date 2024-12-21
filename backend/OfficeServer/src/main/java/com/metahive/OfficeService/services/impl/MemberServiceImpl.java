package com.metahive.OfficeService.services.impl;

import com.metahive.OfficeService.entities.Member;
import com.metahive.OfficeService.entities.Office;
import com.metahive.OfficeService.exceptions.ResourceNotFoundException;
import com.metahive.OfficeService.payloads.MemberDTO;
import com.metahive.OfficeService.repositories.MemberRepository;
import com.metahive.OfficeService.repositories.OfficeRepository;
import com.metahive.OfficeService.services.MemberService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class MemberServiceImpl implements MemberService {

    @Autowired
    private MemberRepository memberRepository;

    @Autowired
    private OfficeRepository officeRepository;

    @Override
    public MemberDTO addMemberToOffice(MemberDTO memberDTO) {
        // I will add a method called isAdmin or isCreator and the userId will be taken form token

        Office office = officeRepository.findById(memberDTO.getOfficeId())
                .orElseThrow(() -> new ResourceNotFoundException("Office", "id", memberDTO.getOfficeId()));

        if (isMemberExistInThisOffice(memberDTO)) {
            throw new RuntimeException("Member already exists in this office");
        }

        Member member = new Member();
        member.setUserId(memberDTO.getUserId());
        member.setOffice(office);

        Member savedMember = memberRepository.save(member);
        return convertToDTO(savedMember);
    }

    @Override
    public List<MemberDTO> getAllMembersByOfficeId(Long officeId) {
        // First verify if office exists
        officeRepository.findById(officeId)
                .orElseThrow(() -> new ResourceNotFoundException("Office", "id", officeId));

        List<Member> members = memberRepository.findByOfficeOfficeId(officeId);

        if (members.isEmpty()) {
            throw new ResourceNotFoundException("Members", "officeId", officeId);
        }

        return members.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public List<MemberDTO> getAllMembers() {
        List<Member> members = memberRepository.findAll();
        return members.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public Boolean isMemberExistInThisOffice(MemberDTO memberDTO) {
        return memberRepository.existsByUserIdAndOfficeOfficeId(
                memberDTO.getUserId(),
                memberDTO.getOfficeId()
        );
    }

    @Override
    @Transactional
    public void removeMemberByOfficeId(Long id) {
        memberRepository.deleteByOfficeOfficeId(id);
    }

    // Additional useful methods
    public List<MemberDTO> getMembersByOfficeId(Long officeId) {
        List<Member> members = memberRepository.findByOfficeOfficeId(officeId);
        return members.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public void removeMember(Long memberId) {
        memberRepository.findById(memberId)
                .orElseThrow(() -> new ResourceNotFoundException("Member", "id", memberId));
        memberRepository.deleteById(memberId);
    }

    private MemberDTO convertToDTO(Member member) {
        return new MemberDTO(
                member.getId(),
                member.getUserId(),
                member.getOffice().getOfficeId()
        );
    }
}