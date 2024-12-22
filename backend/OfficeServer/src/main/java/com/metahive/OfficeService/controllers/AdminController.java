package com.metahive.OfficeService.controllers;

import com.metahive.OfficeService.payloads.AdminDTO;
import com.metahive.OfficeService.payloads.ApiResponse;
import com.metahive.OfficeService.services.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/os/admin")
public class AdminController {

    @Autowired
    private AdminService adminService;

    @PostMapping("/add")
    public ResponseEntity<AdminDTO> addAdmin(@RequestBody AdminDTO adminDTO) {
        AdminDTO savedAdmin = adminService.addAdminToOffice(adminDTO);
        return new ResponseEntity<>(savedAdmin, HttpStatus.CREATED);
    }

    @GetMapping("/all")
    public ResponseEntity<List<AdminDTO>> getAllAdmins() {
        List<AdminDTO> admins = adminService.getAllAdmins();
        return ResponseEntity.ok(admins);
    }

    @GetMapping("/office/{officeId}")
    public ResponseEntity<List<AdminDTO>> getAdminsByOffice(@PathVariable Long officeId) {
        List<AdminDTO> admins = adminService.getAllAdminsByOfficeId(officeId);
        return ResponseEntity.ok(admins);
    }

    @DeleteMapping("/{userId}/office/{officeId}")
    public ResponseEntity<ApiResponse> deleteAdminByUserIdAndOfficeId(
            @PathVariable String userId,
            @PathVariable Long officeId) {
        AdminDTO adminDTO = new AdminDTO();
        adminDTO.setUserId(userId);
        adminDTO.setOfficeId(officeId);

        if (!adminService.isAdminExistInThisOffice(adminDTO)) {
            return new ResponseEntity<>(
                    new ApiResponse("Admin not found in this office", false),
                    HttpStatus.NOT_FOUND
            );
        }

        adminService.removeAdminByUserIdAndOfficeId(userId, officeId);
        return new ResponseEntity<>(
                new ApiResponse("Admin removed successfully", true),
                HttpStatus.OK
        );
    }

    @DeleteMapping("/office/{officeId}")
    public ResponseEntity<ApiResponse> deleteAllAdminsByOfficeId(@PathVariable Long officeId) {
        adminService.removeAdminByOfficeId(officeId);
        return new ResponseEntity<>(
                new ApiResponse("All admins removed from office successfully", true),
                HttpStatus.OK
        );
    }

    @GetMapping("/check")
    public ResponseEntity<Boolean> checkAdminExists(@RequestBody AdminDTO adminDTO) {
        Boolean exists = adminService.isAdminExistInThisOffice(adminDTO);
        return ResponseEntity.ok(exists);
    }
}