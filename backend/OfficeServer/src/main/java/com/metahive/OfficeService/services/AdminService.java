package com.metahive.OfficeService.services;


import com.metahive.OfficeService.payloads.AdminDTO;

import java.util.List;

public interface AdminService {
    AdminDTO addAdminToOffice(AdminDTO adminDTO);
    List<AdminDTO> getAllAdmins();
    List<AdminDTO> getAllAdminsByOfficeId(Long officeId);
    void removeAdminByOfficeId(Long id);
}
