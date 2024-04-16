package com.cureconnect.CureConnect.Users.Controller;

import com.cureconnect.CureConnect.Users.Model.Users;
import com.cureconnect.CureConnect.Users.Service.UsersService;
import com.google.firebase.auth.FirebaseAuthException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Optional;

@RestController()
@RequestMapping("/api/v1/user")
@CrossOrigin(origins = "*")
public class UsersController {

    @Autowired
    UsersService usersService;
    Logger logger = LoggerFactory.getLogger(UsersController.class);

    /**
     * Retrieves user information.
     *
     * @param jwt The JWT token extracted from the request.
     * @return ResponseEntity containing the user information.
     */
    @GetMapping("/")
    public ResponseEntity getUsers(@AuthenticationPrincipal Jwt jwt) {

        logger.info("JWT->" + jwt.getClaims());
        logger.info("Subject->" + jwt.getSubject());

        return ResponseEntity.ok("Check Logger!");
    }

    /**
     * Registers a new user.
     *
     * @param users The user object to be registered.
     * @return ResponseEntity containing the created user information.
     */
    @PostMapping("/register")
    public ResponseEntity<Users> createRegister(@RequestBody Users users) throws FirebaseAuthException {
        Users savedUser = usersService.createUser(users);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedUser);
    }

    /**
     * Retrieves user profile information by ID.
     *
     * @param requestBody A map containing the ID of the user.
     * @return Optional containing the user profile if found, otherwise an empty Optional.
     */
    @PostMapping("/profile")
//    @PreAuthorize("hasAuthority('ROLE:PATIENT') or hasAuthority('ROLE:DOCTOR')")
    public Optional<Users> findUserById(@RequestBody Map<String, String> requestBody) {
        String id = requestBody.get("id");
        return usersService.findUserById(id);
    }

    /**
     * Updates the user profile based on the provided information.
     *
     * @param requestBody A map containing the updated user profile information.
     * @return ResponseEntity containing a success message if the update was successful,
     * otherwise an error message with an appropriate HTTP status code.
     */
    @PostMapping("/update/profile")
    public ResponseEntity<String> updateUser(@RequestBody Map<String, String> requestBody) {

        Optional<Users> updatedUser = usersService.updateUserProfile(requestBody);

        if (updatedUser.isPresent()) {
            return ResponseEntity.ok("{\"Success\":\"User details are updated\"}");
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("{\"Message\":\"User not available or something went wrong\"}");
        }
    }

    /**
     * Validates the existence of a user based on the provided email.
     *
     * @param requestBody A map containing the email address to validate.
     * @return True if a user with the specified email exists, otherwise false.
     */
    @PostMapping("/EmailValidation")
    public boolean findUserByEmail(@RequestBody Map<String, String> requestBody) {
        return usersService.findUserByEmail(requestBody.get("email"));
    }
}
