package com.metahive.OfficeService.controllers;

import com.metahive.OfficeService.payloads.MemberDTO;
import com.metahive.OfficeService.services.MemberService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/os/members")
public class MemberController {

    @Autowired
    private MemberService memberService;

    @PostMapping
    public ResponseEntity<MemberDTO> addMember(@RequestBody MemberDTO memberDTO) {
        MemberDTO savedMember = memberService.addMemberToOffice(memberDTO);
        return new ResponseEntity<>(savedMember, HttpStatus.CREATED);
    }

    @GetMapping("/office/{officeId}")
    public ResponseEntity<List<MemberDTO>> getAllMembersByOfficeId(@PathVariable Long officeId) {
        List<MemberDTO> members = memberService.getAllMembersByOfficeId(officeId);
        return ResponseEntity.ok(members);
    }

    @GetMapping
    public ResponseEntity<List<MemberDTO>> getAllMembers() {
        List<MemberDTO> members = memberService.getAllMembers();
        return ResponseEntity.ok(members);
    }

    @DeleteMapping("/office/{officeId}")
    public ResponseEntity<Void> removeMemberByOfficeId(@PathVariable Long officeId) {
        memberService.removeMemberByOfficeId(officeId);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/{userId}/office/{officeId}")
    public ResponseEntity<Void> removeMemberByUserId(@PathVariable String userId, @PathVariable Long officeId) {
      memberService.removeAdminByUserIdAndOfficeId(userId, officeId);
      return ResponseEntity.noContent().build();
    };

    @GetMapping("/check")
    public ResponseEntity<Boolean> checkMemberExists(@RequestBody MemberDTO memberDTO) {
        Boolean exists = memberService.isMemberExistInThisOffice(memberDTO);
        return ResponseEntity.ok(exists);
    }
}