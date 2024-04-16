package com.cureconnect.CureConnect.Appointment.Model;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class Prescription {
    private String medicineId;
    private String medicineName;
    private int quantity;
    private String description;
}
