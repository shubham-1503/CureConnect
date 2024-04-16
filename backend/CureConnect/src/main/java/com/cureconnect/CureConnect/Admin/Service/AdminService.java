package com.cureconnect.CureConnect.Admin.Service;

import com.cureconnect.CureConnect.doctors.model.Doctor;
import com.cureconnect.CureConnect.doctors.service.DoctorService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AdminService {
    @Autowired
    DoctorService doctorService;
    @Autowired
    ModelMapper modelMapper;
    public List<Doctor> getDoctorUsers(){
        return doctorService.getDoctorUsers();
    }
    public List<Doctor> getDoctorUsersByApprovalStatus(boolean approvalStatus){
        List<Doctor> usersList = doctorService.getDoctorUsersByApprovalStatus(approvalStatus);
        return usersList.stream().map(users -> modelMapper.map(users,Doctor.class)).toList();
    }
    public ResponseEntity approveDoctor(String id){
        return doctorService.approveUser(id);
    }
}
