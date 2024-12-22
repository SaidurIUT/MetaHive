package com.metahive.OfficeService.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor


public class Office {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String officeName;

    @Column(length = 9999)
    private String description;

    private String createdBy;

    private Date createdOn;

    private String imageName;

    @OneToMany(cascade = CascadeType.ALL)
    private Set<Admin> admins = new HashSet<>();

    @OneToMany(cascade = CascadeType.ALL)
    private Set<Member> members = new HashSet<>();
}
