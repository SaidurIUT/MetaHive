package com.metahive.OfficeService.services;

import com.metahive.OfficeService.payloads.OfficeDTO;

import java.util.List;

public interface OfficeService {
    OfficeDTO createOffice(OfficeDTO officeDTO);
    OfficeDTO getOfficeById(Long id);
    List<OfficeDTO> getAllOffices();
    OfficeDTO updateOffice(Long id, OfficeDTO officeDTO);
    void deleteOffice(Long id);
}