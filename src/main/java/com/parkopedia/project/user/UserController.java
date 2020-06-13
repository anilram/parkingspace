package com.parkopedia.project.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * User Rest Controller to serve rest points.
 * 
 * @author Reece Shah/1519992
 */
@RestController
@RequestMapping("/v1/user")
public class UserController {
    

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/auth")
    public String authenticate(@RequestBody final User user){
        final User userEntity = userRepository.findByUsername(user.getUsername());
        if(userEntity!=null && userEntity.getPassword().equals(user.getPassword())){
            return "Success";
        } else {
            return "Enter Valid Credentials";
        }
    }

}