package com.parkopedia.project.feedback;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

/**
 * FeedBack Repository to hit database.
 * 
 * @author Reece Shah/1519992
 */
@Repository
public interface FeedBackRepository extends MongoRepository<FeedBack,String>{
    
}