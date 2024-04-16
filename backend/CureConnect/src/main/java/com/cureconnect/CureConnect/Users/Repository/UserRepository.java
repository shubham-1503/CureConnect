package com.cureconnect.CureConnect.Users.Repository;


import com.cureconnect.CureConnect.Users.Model.Users;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.List;
import java.util.Optional;
public interface UserRepository extends MongoRepository<Users, Id> {

    Optional<Users> findById(String id);

    List<Users> findAllByIdIn(List<String> ids);
    @Query(value = "{ 'email' : ?0 }", exists = true)
    boolean findByEmail(String email);
}
