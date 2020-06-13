package com.parkopedia.project.user;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

/**
 * User JPA Repository to hit database.
 * @author Reece Shah/1519992
 */
@Repository
public interface UserRepository extends MongoRepository<User, String> {
    User findByUsername(String username);
}