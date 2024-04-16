package com.cureconnect.CureConnect.Appointment.Repository;

import com.cureconnect.CureConnect.Appointment.Model.Appointment;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Repository for the {@link Appointment}
 */
@Repository
public interface AppointmentRepository extends MongoRepository<Appointment, String> {
    public List<Appointment> findByDoctorId(String doctorId);
    
    public List<Appointment> findByPatientId(String userId);

    List<Appointment> findByDoctorIdAndStartLessThanAndBooked(String doctorId, Long start, boolean booked);

    List<String> findDistinctPatientIdsByDoctorIdAndStartLessThanAndBooked(String doctorId, Long start, boolean booked);

    List<Appointment> findByDoctorIdAndStartBetweenAndBooked(String doctorId, Long start, Long end, boolean booked);

    List<Appointment> findByDoctorIdAndStartLessThanEqualAndBooked(String doctorId, Long start, boolean booked);
    List<Appointment> findByDoctorIdAndPatientIdAndStartLessThanEqualAndBooked(String doctorId,String patientId, Long start, boolean booked);
    List<Appointment> findByDoctorIdAndPatientIdAndStartGreaterThanEqualAndBooked(String doctorId,String patientId, Long start, boolean booked);
}
