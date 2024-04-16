package com.cureconnect.CureConnect.Appointment.service;

import com.cureconnect.CureConnect.Appointment.Model.Appointment;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public interface IAppointmentService {
    public boolean addAppointments(List<Appointment> appointmentList);

    public boolean deleteAppointment(String id);

    public Map<Long, List<Appointment>> getAppointmentsByDate(String doctorId);

    public List<Appointment> getAppointmentsByDoctor(String doctorId);
    
    public List<Appointment> getAppointmentsByUserId(String userId);

    public boolean updateAppointment(Appointment appointment);

    public Map<Long, List<Appointment>> getAvailableAppointmentFromToday(String doctorId);

    public Appointment getAppointment(String id);

    public int getNumberOfAppointmentsCompleted(String doctorId);

    public int getNumberOfDistinctPatientsTreated(String doctorId);

    public Double getTotalAmountEarnedForCurrentMonth(String doctorId);

    public Double getTotalAmountEarnedTillDate(String doctorId);

}
