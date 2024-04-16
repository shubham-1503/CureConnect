package com.cureconnect.CureConnect.Inventory.Repository;

import com.cureconnect.CureConnect.Inventory.Model.Medicine;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MedicineRepository extends MongoRepository<Medicine, String> {
    public List<Medicine> findByName(String name);
}
