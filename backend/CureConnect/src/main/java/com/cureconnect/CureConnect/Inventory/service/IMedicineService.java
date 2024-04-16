package com.cureconnect.CureConnect.Inventory.service;

import com.cureconnect.CureConnect.Inventory.Model.Medicine;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@Service
public interface IMedicineService {

    public List<Medicine> getAllMedicines();

    public boolean addMedicine(Medicine newMedicine);

    public boolean addMultipleMedicines(MultipartFile file) throws IOException;

    public void deleteMedicine(String id);

    public List<Medicine> getMedicinesByName(String[] medicines);

    public boolean updateMedicines(List<Medicine> medicines);
}
