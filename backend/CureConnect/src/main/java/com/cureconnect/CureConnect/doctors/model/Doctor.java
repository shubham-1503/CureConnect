package com.cureconnect.CureConnect.doctors.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Document(collection = "doctor")
public class Doctor {
    @Id
    private String id;
    private String userName;
    private String email;
    private Long number;
    private String gender;
    private String specialization;
    private String educationDetails;
    private Long experience;
    private String description;
    private String profileUrl;
    private String licenseUrl;
    private Boolean approved;

}
