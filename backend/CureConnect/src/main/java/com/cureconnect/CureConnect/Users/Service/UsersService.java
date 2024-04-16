package com.cureconnect.CureConnect.Users.Service;

import com.cureconnect.CureConnect.Users.Model.Users;
import com.cureconnect.CureConnect.Users.Repository.UserRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.firebase.auth.FirebaseAuth;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.*;

/**
 * Service class for managing user-related operations.
 */
@Service
@RequiredArgsConstructor
public class UsersService {


    @Autowired
    UserRepository userRepository;
    @Autowired
    private FirebaseAuth firebaseAuth;
    private final ObjectMapper objectMapper;

    Logger logger = LoggerFactory.getLogger(UsersService.class);

    /**
     * Constructs a new UsersService with the provided UserRepository.
     *
     * @param userRepository The repository for user data.
     */
    @Autowired
    public UsersService(UserRepository userRepository) {
        this.userRepository = userRepository;
        this.objectMapper = new ObjectMapper();
    }

    /**
     * Creates a new user by saving the provided user object.
     *
     * @param users The user object to be created.
     * @return The created user object if successful, otherwise null.
     */
    public Users createUser(Users users) {
        try {
            Users savedUser = userRepository.save(users);
            var customClaims = new ArrayList<String>();
            customClaims.add("ROLE:" + users.getUserRole().toUpperCase());
            firebaseAuth.setCustomUserClaims(users.getId(), Map.of("custom_claims", customClaims));
            return savedUser;
        } catch (Exception e) {
            logger.error("Error occurred while saving user: " + e.getMessage());
        }
        return null;
    }

    /**
     * Finds a user identifier.
     *
     * @param id The unique identifier of the user.
     * @return An Optional containing the found user if successful, otherwise an empty Optional.
     */
    public Optional<Users> findUserById(String id) {
        try {

            return userRepository.findById(id);

        } catch (Exception e) {
            logger.error("Error occurred while fetching user: " + e.getMessage());
        }
        return Optional.empty();
    }

    /**
     * Finds a user by their email address.
     *
     * @param email The email address of the user to find.
     * @return True if a user with the specified email address exists, otherwise false.
     */
    public boolean findUserByEmail(String email) {

        return userRepository.findByEmail(email);
    }

    /**
     * Updates the user profile based on the information provided in the body
     *
     * @param requestMap A map containing key-value pairs of user profile information.
     * @return An Optional containing the updated user profile if successful, otherwise an empty Optional.
     */
    public Optional<Users> updateUserProfile(Map<String, String> requestMap) {

        try {
            DateFormat formatter = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss");

            Optional<Users> user = userRepository.findById(requestMap.get("id"));
            Date birthDate = null;

            if (user.isPresent()) {

                if (requestMap.get("birthdate") != null && !requestMap.get("birthdate").isEmpty()) {
                    birthDate = formatter.parse(requestMap.get("birthdate"));
                }

                Users userDetails = user.get();
                userDetails.setUserName(requestMap.get("userName"));
                userDetails.setUserRole(requestMap.get("userRole"));
                userDetails.setBirthdate(birthDate);
                userDetails.setEmail(requestMap.get("email"));
                if (requestMap.get("number") != null && !requestMap.get("number").isEmpty()) {
                    userDetails.setNumber(Long.parseLong(requestMap.get("number")));
                }
                userDetails.setGender(requestMap.get("gender"));
                userDetails.setAddress(requestMap.get("address"));
                userDetails.setCity(requestMap.get("city"));
                userDetails.setPostcode(requestMap.get("postcode"));
                userDetails.setCountry(requestMap.get("country"));
                userDetails.setProfilePicture(requestMap.get("profilePicture"));

                userRepository.save(userDetails);

                // Return the updated user details
                return Optional.of(userDetails);
            } else {
                // return empty as user is not available
                return Optional.empty();
            }
        } catch (Exception e) {
            e.printStackTrace();
            return Optional.empty();
        }
    }

    public List<Users> getUsersByIds(List<String> ids) {
        return userRepository.findAllByIdIn(ids);
    }

}
