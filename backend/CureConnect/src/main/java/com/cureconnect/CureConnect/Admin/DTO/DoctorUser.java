package com.cureconnect.CureConnect.Admin.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DoctorUser {
    private String id;

    private String userName;
    private String userRole;
    private String email;
    private Long number;
    private Date birthdate;
    private String gender;
    private String address;
    private String city;
    private String postcode;
    private String country;
    private String profilePicture;
    private boolean isAdminApproved;
}
