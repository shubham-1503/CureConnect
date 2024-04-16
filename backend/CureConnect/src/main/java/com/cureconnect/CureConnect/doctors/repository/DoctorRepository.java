package com.cureconnect.CureConnect.doctors.repository;

import com.cureconnect.CureConnect.doctors.model.Doctor;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.Optional;

/**
 * Repository for the {@link Doctor}
 */
public interface DoctorRepository extends MongoRepository<Doctor, String> {
    List<Doctor> findByApprovedTrue();
    List<Doctor> findDoctorsByApproved(boolean approved);
    Optional<Doctor> findDoctorByIdIs(String id);
}
