package com.metahive.OfficeService.services.impl;

import com.metahive.OfficeService.entities.Office;
import com.metahive.OfficeService.payloads.OfficeDTO;
import com.metahive.OfficeService.repositories.OfficeRepository;
import com.metahive.OfficeService.services.OfficeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class OfficeServiceImpl implements OfficeService {

    @Autowired
    private OfficeRepository officeRepository;

    @Override
    public OfficeDTO createOffice(OfficeDTO officeDTO) {
        Office office = new Office();
        // Map DTO to Entity
        office.setOfficeName(officeDTO.getOfficeName());
        office.setDescription(officeDTO.getDescription());
        office.setCreatedBy(officeDTO.getCreatedBy());
        office.setCreatedOn(new Date());
        office.setImageName("default.png");
        office = officeRepository.save(office);
        officeDTO.setOfficeId(office.getOfficeId());
        return officeDTO;
    }

    @Override
    public OfficeDTO getOfficeById(Long id) {
        Office office = officeRepository.findById(id).orElseThrow(() -> new RuntimeException("Office not found"));
        return mapToDTO(office);
    }

    @Override
    public List<OfficeDTO> getAllOffices() {
        return officeRepository.findAll().stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    @Override
    public OfficeDTO updateOffice(Long id, OfficeDTO officeDTO) {
        Office office = officeRepository.findById(id).orElseThrow(() -> new RuntimeException("Office not found"));
        // Update fields
        office.setOfficeName(officeDTO.getOfficeName());
        office.setDescription(officeDTO.getDescription());
        office.setCreatedBy(officeDTO.getCreatedBy());
        office.setCreatedOn(officeDTO.getCreatedOn());
        office.setImageName(officeDTO.getImageName());
        office = officeRepository.save(office);
        return mapToDTO(office);
    }

    @Override
    public void deleteOffice(Long id) {
        officeRepository.deleteById(id);
    }

    private OfficeDTO mapToDTO(Office office) {
        OfficeDTO dto = new OfficeDTO();
        dto.setOfficeId(office.getOfficeId());
        dto.setOfficeName(office.getOfficeName());
        dto.setDescription(office.getDescription());
        dto.setCreatedBy(office.getCreatedBy());
        dto.setCreatedOn(office.getCreatedOn());
        dto.setImageName(office.getImageName());
        dto.setAdminIds(office.getAdmins().stream().map(admin -> admin.getId()).collect(Collectors.toSet()));
        dto.setMemberIds(office.getMembers().stream().map(member -> member.getId()).collect(Collectors.toSet()));
        return dto;
    }
}