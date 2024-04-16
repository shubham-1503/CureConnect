package com.cureconnect.CureConnect.Appointment.service;

import com.cureconnect.CureConnect.Appointment.Model.Appointment;
import com.cureconnect.CureConnect.Appointment.Repository.AppointmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.temporal.TemporalAdjusters;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class AppointmentService implements IAppointmentService {

    @Autowired
    AppointmentRepository appointmentRepository;
    @Autowired
    MongoTemplate mongoTemplate;

    /**
     * Saves a list of appointments to the database.
     *
     * @param appointmentList the list of appointments to be saved
     * @return true if the appointments were successfully saved
     */
    @Override
    public boolean addAppointments(List<Appointment> appointmentList) {
        appointmentRepository.saveAll(appointmentList);
        return true;
    }

    /**
     * Deletes an appointment by ID.
     *
     * @param id the ID of the appointment to be deleted
     * @return true if the appointment is deleted, false otherwise
     */
    @Override
    public boolean deleteAppointment(String id) {
        Optional<Appointment> appointment = appointmentRepository.findById(id);
        if (appointment.isPresent()) {
            appointmentRepository.deleteById(id);
            return true;
        }
        return false;
    }

    /**
     * Retrieves appointments by date for a specific doctor.
     *
     * @param doctorId The ID of the doctor to retrieve appointments for
     * @return A map of appointment dates to lists of appointments
     */
    @Override
    public Map<Long, List<Appointment>> getAppointmentsByDate(String doctorId) {
        Map<Long, List<Appointment>> appointmentMap = new HashMap<>();

        List<Appointment> appointmentList = appointmentRepository.findByDoctorId(doctorId);

        for (Appointment appointment : appointmentList) {
            Long dateValue = appointment.getAppointmentDate();
            List<Appointment> appointments = appointmentMap.getOrDefault(dateValue, new ArrayList<>());
            appointments.add(appointment);
            appointmentMap.put(dateValue, appointments);
        }

        return appointmentMap;
    }

    /**
     * Retrieves a list of appointments for a specific doctor.
     *
     * @param doctorId the ID of the doctor to retrieve appointments for
     * @return a list of appointments associated with the specified doctor
     */
    @Override
    public List<Appointment> getAppointmentsByDoctor(String doctorId) {
        return appointmentRepository.findByDoctorId(doctorId);
    }

    /**
     * Retrieves appointments for a specific user.
     *
     * @param userId the ID of the user
     * @return list of appointments for the user
     */
    @Override
    public List<Appointment> getAppointmentsByUserId(String userId) {
        return appointmentRepository.findByPatientId(userId);
    }

    /**
     * A function to get available appointments starting from today for a specific doctor.
     *
     * @param doctorId the ID of the doctor to get appointments for
     * @return a map of available appointments indexed by date
     */
    @Override
    public Map<Long, List<Appointment>> getAvailableAppointmentFromToday(String doctorId) {
        long currentMillis = System.currentTimeMillis();
        LocalDateTime startOfDay = LocalDate.now().atStartOfDay();
        long todayMillis = startOfDay.atZone(ZoneId.systemDefault()).toInstant().toEpochMilli();
        Map<Long, List<Appointment>> appointmentMap = getAppointmentsByDate(doctorId);
        appointmentMap = appointmentMap.entrySet().stream().filter(appointment -> appointment.getKey() >= todayMillis).collect(Collectors.toMap(Map.Entry::getKey, Map.Entry::getValue));
        return appointmentMap.entrySet().stream()
                .collect(Collectors.toMap(Map.Entry::getKey,
                        entry -> entry.getValue().stream()
                                .filter(appointment -> !appointment.isBooked() && appointment.getStart() > currentMillis)
                                .collect(Collectors.toList())));
    }

    /**
     * Retrieves an appointment by its ID.
     *
     * @param id the ID of the appointment to retrieve
     * @return the appointment if found, otherwise null
     */
    @Override
    public Appointment getAppointment(String id) {
        Optional<Appointment> optional = appointmentRepository.findById(id);
        return optional.orElse(null);
    }


    /**
     * Updates the appointment with new information and saves it.
     *
     * @param appointment the appointment to be updated
     * @return true if the appointment was successfully updated
     */
    @Override
    public boolean updateAppointment(Appointment appointment) {
        appointment.setPatientName("John Doe");
        appointmentRepository.save(appointment);
        return true;
    }

    /**
     * Retrieves the number of completed appointments for a specific doctor.
     *
     * @param doctorId The unique identifier of the doctor
     * @return The number of completed appointments
     */
    public int getNumberOfAppointmentsCompleted(String doctorId) {
        long currentMillis = System.currentTimeMillis();
        List<Appointment> completedAppointments = appointmentRepository.findByDoctorIdAndStartLessThanAndBooked(doctorId, currentMillis, true);
        return completedAppointments.size();
    }

    /**
     * Retrieves the number of distinct patients treated by a doctor.
     *
     * @param doctorId the ID of the doctor
     * @return the number of distinct patient IDs treated
     */
    public int getNumberOfDistinctPatientsTreated(String doctorId) {
        long currentMillis = System.currentTimeMillis();
        List<Appointment> appointments = appointmentRepository.findByDoctorIdAndStartLessThanAndBooked(doctorId, currentMillis, true);
        Set<String> distinctPatientIds = appointments.stream()
                .map(Appointment::getPatientId)
                .collect(Collectors.toSet());
        return distinctPatientIds.size();
    }

    /**
     * A method to calculate the total amount earned by a doctor for the current month.
     *
     * @param doctorId the ID of the doctor for whom the total amount is calculated
     * @return the total amount earned by the doctor for the current month
     */
    @Override
    public Double getTotalAmountEarnedForCurrentMonth(String doctorId) {
        LocalDateTime now = LocalDateTime.now();
        LocalDateTime startOfMonth = now.withDayOfMonth(1).withHour(0).withMinute(0).withSecond(0).withNano(0);
        LocalDateTime endOfMonth = now.with(TemporalAdjusters.lastDayOfMonth()).withHour(23).withMinute(59).withSecond(59).withNano(999999999);

        long startOfMonthMillis = startOfMonth.atZone(ZoneId.systemDefault()).toInstant().toEpochMilli();
        long endOfMonthMillis = now.atZone(ZoneId.systemDefault()).toInstant().toEpochMilli();

        List<Appointment> appointments = appointmentRepository.findByDoctorIdAndStartBetweenAndBooked(doctorId, startOfMonthMillis, endOfMonthMillis, true);

        return appointments.stream()
                .mapToDouble(Appointment::getPrice)
                .sum();
    }

    /**
     * Returns the total amount earned by a doctor until the current date.
     *
     * @param doctorId the unique identifier of the doctor
     * @return the total amount earned by the doctor
     */
    @Override
    public Double getTotalAmountEarnedTillDate(String doctorId) {
        LocalDateTime currentDate = LocalDateTime.now();
//        LocalDateTime startOfDate = currentDate.withHour(0).withMinute(0).withSecond(0).withNano(0);

        long startOfDateMillis = currentDate.atZone(ZoneId.systemDefault()).toInstant().toEpochMilli();

        List<Appointment> appointments = appointmentRepository.findByDoctorIdAndStartLessThanEqualAndBooked(doctorId, startOfDateMillis, true);

        return appointments.stream()
                .mapToDouble(Appointment::getPrice)
                .sum();
    }

    /**
     * Retrieves future appointments for a given doctor and patient.
     *
     * @param doctorId  the ID of the doctor
     * @param patientId the ID of the patient
     * @return a list of future appointments
     */
    public List<Appointment> getFutureAppointmentsByDoctorIdAndPatientId(String doctorId, String patientId) {
        LocalDateTime currentDate = LocalDateTime.now();
        long currentDateInMillis = currentDate.atZone(ZoneId.systemDefault()).toInstant().toEpochMilli();
        return appointmentRepository.findByDoctorIdAndPatientIdAndStartGreaterThanEqualAndBooked(doctorId, patientId, currentDateInMillis, true);
    }

    /**
     * Retrieves past appointments by doctor id and patient id.
     *
     * @param doctorId  the id of the doctor
     * @param patientId the id of the patient
     * @return a list of past appointments
     */
    public List<Appointment> getPastAppointmentsByDoctorIdAndPatientId(String doctorId, String patientId) {
        LocalDateTime currentDate = LocalDateTime.now();
        long currentDateInMillis = currentDate.atZone(ZoneId.systemDefault()).toInstant().toEpochMilli();
        return appointmentRepository.findByDoctorIdAndPatientIdAndStartLessThanEqualAndBooked(doctorId, patientId, currentDateInMillis, true);
    }

    /**
    * Retrieves past appointments by doctor id and patient id.
    *
    * @param  doctorId    the id of the doctor
    * @param  patientId   the id of the patient
    * @return             a list of past appointments
    */
   public List<Appointment> getPastAppointmentsByDoctorIdAndPatientId(String doctorId,String patientId){
       LocalDateTime currentDate = LocalDateTime.now();
       long currentDateInMillis = currentDate.atZone(ZoneId.systemDefault()).toInstant().toEpochMilli();
       return appointmentRepository.findByDoctorIdAndPatientIdAndStartLessThanEqualAndBooked(doctorId,patientId,currentDateInMillis,true);
   }
}
