package com.parkopedia.project.parkingslot;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

/**
 * Parking slot JPA Repository to hit database.
 * @author Reece Shah/1519992
 */
@Repository
public interface ParkingSlotRepository extends MongoRepository<ParkingSlot,String>{
    
}