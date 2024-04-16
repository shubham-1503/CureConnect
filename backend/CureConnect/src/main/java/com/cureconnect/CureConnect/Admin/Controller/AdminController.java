package com.cureconnect.CureConnect.Admin.Controller;

import com.cureconnect.CureConnect.Admin.Service.AdminService;
import com.cureconnect.CureConnect.doctors.model.Doctor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/api/v1/admin")
@CrossOrigin(origins = "*")
public class AdminController {

    final AdminService adminService;

    public AdminController(AdminService adminService) {
        this.adminService = adminService;
    }

    @GetMapping("/doctors")
    public ResponseEntity getDoctors() {
        List<Doctor> doctorUsers = adminService.getDoctorUsers();
        if (doctorUsers.isEmpty()) {
            return new ResponseEntity("No Doctor User Exist!", HttpStatus.NOT_FOUND);
        }
        return ResponseEntity.ok(doctorUsers);
    }

    @PutMapping("/doctors/{doctorId}")
    public ResponseEntity approve(@PathVariable String doctorId) {
        adminService.approveDoctor(doctorId);
        return ResponseEntity.ok("Doctor has been approved!");
    }
}
