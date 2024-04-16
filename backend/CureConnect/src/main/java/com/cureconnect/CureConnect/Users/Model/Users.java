package com.cureconnect.CureConnect.Users.Model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;

@Document(collection = "user")
@Data
@NoArgsConstructor
@AllArgsConstructor
@JsonIgnoreProperties(ignoreUnknown = true)
public class Users {

    @Id
    private String id;

    private String userName;
    private String userRole;
    private String email;
    //    private String password;
    private Long number;
    private Date birthdate;
    private String gender;
    private String address;
    private String city;
    private String postcode;
    private String country;
    private String profilePicture;

}
