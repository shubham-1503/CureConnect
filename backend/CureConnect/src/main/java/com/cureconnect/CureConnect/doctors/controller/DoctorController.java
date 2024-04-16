package com.cureconnect.CureConnect.doctors.controller;

import com.cureconnect.CureConnect.doctors.model.Doctor;
import com.cureconnect.CureConnect.doctors.service.DoctorService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController()
@RequestMapping("/api/v1/doctor")
@CrossOrigin(originPatterns = "*")
public class DoctorController {
    Logger logger = LoggerFactory.getLogger(DoctorController.class);

    @Autowired
    DoctorService doctorService;

    /**
     * A method to register a doctor with the given information.
     *
     * @param  doctor	The doctor object to be registered
     * @return         	The ResponseEntity containing the registered doctor
     */
    @PostMapping("/register")
    public ResponseEntity<Doctor> register(@RequestBody Doctor doctor) {

        Doctor responseDoctor = doctorService.registerDoctor(doctor);
        return ResponseEntity.status(HttpStatus.CREATED).body(responseDoctor);
    }

    /**
     * A function that retrieves all approved doctors accessible to patients or doctors.
     *
     * @return         list of approved doctors
     */
    @GetMapping("/getAllApprovedDoctors")
    public ResponseEntity<List<Doctor>> getAllApprovedDoctors() {
        List<Doctor> doctorList = doctorService.getAllApprovedDoctors();
        return ResponseEntity.status(HttpStatus.OK).body(doctorList);
    }

    /**
     * Retrieves a specific Doctor based on the provided doctorId.
     *
     * @param  doctorId  the ID of the doctor to retrieve
     * @return          the ResponseEntity containing the Doctor object
     */
    @GetMapping("/getDoctor/{doctorId}")
    public ResponseEntity<Doctor> getDoctor(@PathVariable String doctorId) {
        Doctor doctor = doctorService.findById(doctorId);
        return ResponseEntity.status(HttpStatus.OK).body(doctor);
    }

    /**
     * A description of the entire Java function.
     *
     * @param  jwt     description of parameter
     * @return         description of return value
     */
    @GetMapping("/patients")
    public ResponseEntity getPatients(@AuthenticationPrincipal Jwt jwt) {
        return doctorService.getPatients(jwt.getSubject());
    }

    /**
     * A description of the entire Java function.
     *
     * @param  jwt    description of parameter
     * @param  patientId    description of parameter
     * @return          description of return value
     */
    @GetMapping("/patients/{patientId}/appointments")
    public ResponseEntity getPatientsAppointments(@AuthenticationPrincipal Jwt jwt, @PathVariable String patientId) {
        return doctorService.getPatientsAppointments(jwt.getSubject(), patientId);
    }

}
