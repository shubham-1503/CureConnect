package com.cureconnect.CureConnect.doctors.DTO;

import com.cureconnect.CureConnect.Appointment.Model.Prescription;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PatientAppointment {
    String id;
    String type;
    String description;
    Date date;
    Long start;
    Long end;
    String allergies;
    String reason;
    Double price;
    private List<Prescription> prescriptionList;
}
