package com.cureconnect.CureConnect.doctors.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AttendedPatients {
    String id;
    String patientName;
    long age;
    String gender;
}
