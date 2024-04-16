package com.cureconnect.CureConnect.doctors.service;

import com.cureconnect.CureConnect.Appointment.Model.Appointment;
import com.cureconnect.CureConnect.Appointment.service.AppointmentService;
import com.cureconnect.CureConnect.Users.Model.Users;
import com.cureconnect.CureConnect.Users.Service.UsersService;
import com.cureconnect.CureConnect.doctors.DTO.AttendedPatients;
import com.cureconnect.CureConnect.doctors.DTO.GetPatientAppointments;
import com.cureconnect.CureConnect.doctors.DTO.PatientAppointment;
import com.cureconnect.CureConnect.doctors.model.Doctor;
import com.cureconnect.CureConnect.doctors.repository.DoctorRepository;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class DoctorService {
    @Autowired
    DoctorRepository doctorRepository;
    @Autowired
    UsersService usersService;

    @Autowired
    ModelMapper modelMapper;
    @Autowired
    AppointmentService appointmentService;

    /**
     * A description of the entire Java function.
     *
     * @param  doctor	description of parameter
     * @return         	description of return value
     */
    public Doctor registerDoctor(Doctor doctor) {
        return doctorRepository.save(doctor);
    }

    /**
     * Retrieves all approved doctors from the doctor repository.
     *
     * @return         	list of approved doctors
     */
    public List<Doctor> getAllApprovedDoctors() {
        return doctorRepository.findByApprovedTrue();
    }

    /**
     * Finds a doctor by their ID.
     *
     * @param  id   the ID of the doctor to find
     * @return      the doctor with the specified ID
     */
    public Doctor findById(String id) {
        return doctorRepository.findById(id).orElseThrow(() -> new NoSuchElementException("No doctor found with ID: " + id));
    }

    /**
     * Retrieves the list of attended patients for a given doctor.
     *
     * @param  doctorId  The ID of the doctor
     * @return          ResponseEntity with the list of attended patients
     */
    public ResponseEntity getPatients(String doctorId){
        List<Appointment> appointments = appointmentService.getAppointmentsByDoctor(doctorId);
        List<AttendedPatients> attendedPatients = new LinkedList<>();
        if(appointments.size()>0){
            Set<String> attendedPatientsIds = appointments.stream().map(Appointment::getPatientId).collect(Collectors.toSet());
            if(!attendedPatientsIds.isEmpty()){
                List<Users> usersList = usersService.getUsersByIds(attendedPatientsIds.stream().toList());
                attendedPatients = usersList.stream().map(user -> {
                    int age = 0;
                    if(user.getBirthdate() != null){
                        age = calculateAgeInYears(user.getBirthdate());
                    }
                    return new AttendedPatients(user.getId(),user.getUserName(),age,user.getGender());
                }).toList();
            }
        }
        return ResponseEntity.ok(attendedPatients);
    }

    /**
     * Retrieves a list of future and past appointments for a given doctor and patient.
     *
     * @param  doctorId   the ID of the doctor
     * @param  patientId  the ID of the patient
     * @return            the ResponseEntity containing the patient's appointments
     */
    public ResponseEntity getPatientsAppointments(String doctorId, String patientId){
        GetPatientAppointments getPatientAppointments = new GetPatientAppointments();
        List<PatientAppointment> futureAppointments = appointmentService.getFutureAppointmentsByDoctorIdAndPatientId(doctorId,patientId)
                .stream().map(appointment -> modelMapper.map(appointment, PatientAppointment.class)).toList();
        List<PatientAppointment> pastAppointments = appointmentService.getPastAppointmentsByDoctorIdAndPatientId(doctorId,patientId)
                .stream().map(appointment -> modelMapper.map(appointment, PatientAppointment.class)).toList();
        getPatientAppointments.setFutureAppointments(futureAppointments);
        getPatientAppointments.setPastAppointments(pastAppointments);
        return ResponseEntity.ok(getPatientAppointments);
    }

    /**
     * Retrieves a list of Doctor users by calling the findAll method in the doctorRepository.
     *
     * @return         The list of Doctor users
     */
    public List<Doctor> getDoctorUsers(){
        return doctorRepository.findAll();
    }

    /**
     * Retrieves a list of Doctor users by calling the findAll method in the doctorRepository.
     *
     * @return         The list of Doctor users
     */
    public static int calculateAgeInYears(Date birthDate) {
        Date currentDate = new Date();
        int age = currentDate.getYear() - birthDate.getYear();
        if (birthDate.getMonth() > currentDate.getMonth() || (birthDate.getMonth() == currentDate.getMonth() && birthDate.getDate() > currentDate.getDate())) {
            age--;
        }
        return age;
    }
    public List<Doctor> getDoctorUsersByApprovalStatus(boolean approved){
        return doctorRepository.findDoctorsByApproved(approved);
    }

    /**
     * A description of the entire Java function.
     *
     * @param  id  description of parameter
     * @return          description of return value
     */
    public ResponseEntity approveUser(String id){
        ResponseEntity response = null;
        Optional<Doctor> optionalUsers = doctorRepository.findDoctorByIdIs(id);
        if(optionalUsers.isEmpty()){
            response = new ResponseEntity("Doctor Not Found!", HttpStatus.NOT_FOUND);
        }else {
            Doctor doctorUser = optionalUsers.get();
            doctorUser.setApproved(true);
            doctorRepository.save(doctorUser);
            response = new ResponseEntity("Doctor User has been Approved!",HttpStatus.OK);
        }
        return response;
    }
}
