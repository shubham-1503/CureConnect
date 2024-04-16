package com.cureconnect.CureConnect.Inventory.Responses;

import com.cureconnect.CureConnect.Inventory.Model.Medicine;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.Map;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@JsonInclude(JsonInclude.Include.NON_NULL)
public class InventoryResponse {
    private String status;
    private String message;
    private List<Medicine> medicineList;
    private Medicine medicine;
    private Map<String, Boolean> uploadStatus;
}
