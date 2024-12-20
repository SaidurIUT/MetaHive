package com.metahive.OfficeService.services;


import com.metahive.OfficeService.payloads.AdminDTO;

import java.util.List;

public interface AdminService {
    AdminDTO addAdmin(AdminDTO adminDTO);
    AdminDTO getAdminById(Long id);
    List<AdminDTO> getAllAdmins();
    void removeAdmin(Long id);
}
