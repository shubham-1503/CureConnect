package com.cureconnect.CureConnect.Appointment.Response;

import com.cureconnect.CureConnect.Appointment.Model.Appointment;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.Map;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@JsonInclude(JsonInclude.Include.NON_NULL)
public class AppointmentResponse {
    private String message;
    private String status;
    private List<Appointment> appointmentList;
    private Map<Long,List<Appointment>> appointmentMapByDate;
    private Integer  numberOfAppointmentsCompleted;
    private Integer numberOfPatientsTreated;
    private Double earningsForMonth;
    private Double totalEarnings;
}
