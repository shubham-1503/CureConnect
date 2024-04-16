package com.cureconnect.CureConnect.Inventory.Model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.opencsv.bean.CsvBindByName;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "medicine")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@JsonIgnoreProperties(ignoreUnknown = true)
public class Medicine {
    @Id
    private String id;
    @CsvBindByName(column = "name", required = true)
    private String name;
    @CsvBindByName(column = "brand", required = true)
    private String brand;
    @CsvBindByName(column = "expiry date", required = true)
    private String expiryDate;
    @CsvBindByName(column = "quantity", required = true)
    private Integer quantity;
    @CsvBindByName(column = "price", required = true)
    private Double price;
    @CsvBindByName(column = "description", required = true)
    private String description;
}
