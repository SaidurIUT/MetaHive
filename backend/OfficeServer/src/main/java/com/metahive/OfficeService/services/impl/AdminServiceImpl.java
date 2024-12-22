package com.metahive.OfficeService.services.impl;

import com.metahive.OfficeService.entities.Admin;
import com.metahive.OfficeService.entities.Office;
import com.metahive.OfficeService.exceptions.ResourceNotFoundException;
import com.metahive.OfficeService.payloads.AdminDTO;
import com.metahive.OfficeService.repositories.AdminRepository;
import com.metahive.OfficeService.repositories.OfficeRepository;
import com.metahive.OfficeService.services.AdminService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class AdminServiceImpl implements AdminService {

    @Autowired
    private AdminRepository adminRepository;

    @Autowired
    private OfficeRepository officeRepository;


    @Override
    public AdminDTO addAdminToOffice(AdminDTO adminDTO) {

        //

        Office office = officeRepository.findById(adminDTO.getOfficeId())
                .orElseThrow(() -> new ResourceNotFoundException("Office","id",adminDTO.getOfficeId()));

        if (isAdminExistInThisOffice(adminDTO)){
            throw new RuntimeException("Admin already exists in this office");
        }

        Admin admin = new Admin();
        admin.setOffice(office);
        admin.setUserId(adminDTO.getUserId());

        Admin savedAdmin = adminRepository.save(admin);



        return convertToDTO(savedAdmin);
    }

    @Override
    public List<AdminDTO> getAllAdmins() {
       List<Admin> admins = adminRepository.findAll();
       return admins.stream()
               .map(this:: convertToDTO)
               .collect(Collectors.toList());
    }

    @Override
    public List<AdminDTO> getAllAdminsByOfficeId(Long officeId) {

        officeRepository.findById(officeId)
                .orElseThrow(() -> new ResourceNotFoundException("Office","id",officeId));

        List<Admin> admins = adminRepository.findByOfficeId(officeId);

        if(admins.isEmpty()){
            throw new ResourceNotFoundException("Admins", "officeId" , officeId);
        }

        return admins.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public Boolean isAdminExistInThisOffice(AdminDTO adminDTO) {
       return adminRepository.existsByUserIdAndOfficeId(adminDTO.getUserId(), adminDTO.getOfficeId());
    }

    @Override
    @Transactional
    public void removeAdminByOfficeId(Long id) {
        adminRepository.deleteByOfficeId(id);
    }

    @Override
    @Transactional
    public void removeAdminByUserIdAndOfficeId(String userId, Long officeId) {
        adminRepository.deleteByUserIdAndOfficeId(userId, officeId);
    }

    private AdminDTO convertToDTO(Admin admin) {
        return new AdminDTO(
                admin.getId(),
                admin.getUserId(),
                admin.getOffice().getId()

        );

    }

}
