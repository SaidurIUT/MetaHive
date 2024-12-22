package com.metahive.OfficeService.payloads;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.Set;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class OfficeDTO {
    private Long id;
    private String officeName;
    private String description;
    private String createdBy;
    private Date createdOn;
    private String imageName;
    private Set<Long> adminIds;
    private Set<Long> memberIds;
}