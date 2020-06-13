package com.parkopedia.project.parkingslot;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * Parking slot Rest Controller to serve rest points.
 * @author Reece Shah/1519992
 */
@RestController
@RequestMapping("/v1/slots")
public class ParkingSlotController {

    @Autowired
    private ParkingSlotRepository parkingSlotRepository;

    @PostMapping(value = "")
    public ParkingSlot saveParkingSlot(@RequestBody final ParkingSlot parkingSlot) {
        final ParkingSlot parkingSlotEntity = parkingSlotRepository.save(parkingSlot);
        return parkingSlotEntity;
    }

    @GetMapping(value = "")
    public List<ParkingSlot> getParkingSlots() {
        final List<ParkingSlot> parkingSlots = parkingSlotRepository.findAll();
        return parkingSlots;
    }

    public ParkingSlotRepository getParkingSlotRepository() {
        return parkingSlotRepository;
    }

    public void setParkingSlotRepository(final ParkingSlotRepository parkingSlotRepository) {
        this.parkingSlotRepository = parkingSlotRepository;
    }
    
}