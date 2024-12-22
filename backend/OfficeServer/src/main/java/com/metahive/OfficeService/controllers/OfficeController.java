package com.metahive.OfficeService.controllers;
import com.metahive.OfficeService.payloads.OfficeDTO;
import com.metahive.OfficeService.services.OfficeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/os/office")
public class OfficeController {

    @Autowired
    private OfficeService officeService;

    @PostMapping
    public OfficeDTO createOffice(@RequestBody OfficeDTO officeDTO) {
        return officeService.createOffice(officeDTO);
    }

    @GetMapping("/{id}")
    public OfficeDTO getOfficeById(@PathVariable Long id) {
        return officeService.getOfficeById(id);
    }

    @GetMapping
    public List<OfficeDTO> getAllOffices() {
        return officeService.getAllOffices();
    }

    @PutMapping("/{id}")
    public OfficeDTO updateOffice(@PathVariable Long id, @RequestBody OfficeDTO officeDTO) {
        return officeService.updateOffice(id, officeDTO);
    }

    @DeleteMapping("/{id}")
    public void deleteOffice(@PathVariable Long id) {
        officeService.deleteOffice(id);
    }
}