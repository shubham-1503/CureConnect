package com.cureconnect.CureConnect.Appointment.Model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Document(collection = "appointment")
@JsonIgnoreProperties(ignoreUnknown = true)
public class Appointment {

    @Id
    private String id;

    private String doctorId;
    private String patientId;
    private Long appointmentDate;
    private Long start;
    private Long end;
    private int slotId;
    private String description;
    private int age;
    private String patientName;
    private String doctorName;
    private String type;
    private String allergies;
    private String reason;
    private Double price;
    private boolean booked;
    private String meetingId;
    private List<Prescription> prescriptionList;
}