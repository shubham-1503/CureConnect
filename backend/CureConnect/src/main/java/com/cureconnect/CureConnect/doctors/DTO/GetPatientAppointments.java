package com.cureconnect.CureConnect.doctors.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class GetPatientAppointments {
    private List<PatientAppointment> pastAppointments;
    private List<PatientAppointment> futureAppointments;
}