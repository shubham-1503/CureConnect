package com.cureconnect.CureConnect.Inventory.Controller;

import com.cureconnect.CureConnect.Inventory.Model.Medicine;
import com.cureconnect.CureConnect.Inventory.Responses.InventoryResponse;
import com.cureconnect.CureConnect.Inventory.service.IMedicineService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/inventory")
@CrossOrigin(origins = "*")
public class InventoryController {

    @Autowired
    IMedicineService medicineService;

    /**
     * Retrieves all medicines from the inventory.
     *
     * @return ResponseEntity containing InventoryResponse with retrieved medicines
     */
    @GetMapping("/all")
    public ResponseEntity<InventoryResponse> getAllMedicine() {
        return ResponseEntity.ok(InventoryResponse.builder().medicineList(medicineService.getAllMedicines()).message("All Medicine's retrieved").status("Success").build());
    }

    /**
     * Adds a new medicine to the inventory.
     *
     * @param medicine The medicine to be added
     * @return ResponseEntity containing InventoryResponse indicating the status of the operation
     */
    @PostMapping("/add")
    public ResponseEntity<InventoryResponse> addMedicine(@RequestBody Medicine medicine) {
        Boolean status = medicineService.addMedicine(medicine);
        if (status) {
            return ResponseEntity.ok(InventoryResponse.builder().status("success").message("Medicine Successfully Added").build());
        }
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(InventoryResponse.builder().status("failed").message("Server encountered problem").build());
    }

    /**
     * Adds multiple medicines to the inventory from uploaded files.
     *
     * @param files The files containing medicines data
     * @return ResponseEntity containing InventoryResponse indicating the status of the operation
     */
    @RequestMapping(path = "/multipleAdd", method = RequestMethod.POST,
            consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
    public ResponseEntity<InventoryResponse> addMultipleMedicine(@RequestParam("uploadedFiles") MultipartFile[] files) {
        Map<String, Boolean> uploadStatus = new HashMap<>();
        Arrays.stream(files).sequential().forEach(file -> {
            try {
                Boolean status = medicineService.addMultipleMedicines(file);
                uploadStatus.put(file.getOriginalFilename(), status);
            } catch (IOException e) {
                throw new RuntimeException(e);
            }
        });
        return ResponseEntity.ok(InventoryResponse.builder().status("success").message("Medicine Successfully Added").uploadStatus(uploadStatus).build());
    }

    /**
     * Deletes a medicine from the inventory by its ID.
     *
     * @param id The ID of the medicine to be deleted
     * @return ResponseEntity containing InventoryResponse indicating the status of the operation
     */
    @DeleteMapping(path = "/delete/{id}")
    public ResponseEntity<InventoryResponse> deleteMedicine(@PathVariable("id") String id) {
        medicineService.deleteMedicine(id);
        return ResponseEntity.ok(InventoryResponse.builder().status("success").message("Medicine Successfully Deleted").build());
    }

    /**
     * Fetches medicines from the inventory by their names.
     *
     * @param medicines An array of medicine names
     * @return ResponseEntity containing InventoryResponse with retrieved medicines
     */
    @GetMapping(path = "/fetchAll")
    public ResponseEntity<InventoryResponse> fetchAllByNames(@RequestParam("medicines") String[] medicines) {
        return ResponseEntity.ok(InventoryResponse.builder().medicineList(medicineService.getMedicinesByName(medicines)).status("success").message("Medicine Successfully Retrieved").build());
    }

    /**
     * Updates inventory quantities for specified medicines.
     *
     * @param medicines List of medicines with updated quantities
     * @return ResponseEntity containing InventoryResponse indicating the status of the operation
     */
    @PutMapping(path = "/updateInventory")
    public ResponseEntity<InventoryResponse> updateByNames(@RequestBody List<Medicine> medicines) {
        medicineService.updateMedicines(medicines);
        return ResponseEntity.ok(InventoryResponse.builder().status("success").message("Updated Inventory").build());
    }
}
