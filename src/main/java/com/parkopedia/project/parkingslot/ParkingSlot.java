package com.parkopedia.project.parkingslot;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

/**
 * parking slot POJO.
 * @author Reece Shah/1519992
 */
@Document
public class ParkingSlot {
    @Id
    private String id;
    private String parkingSpace;
    private String startTime;
    private String endTime;
    private String customerName;
    private String type;
    private String regNum;

    public void setId(String id) {
        this.id = id;
    }

    public String getId() {
        return id;
    }

    public String getParkingSpace() {
        return parkingSpace;
    }

    public String getRegNum() {
        return regNum;
    }

    public void setRegNum(String regNum) {
        this.regNum = regNum;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getCustomerName() {
        return customerName;
    }

    public void setCustomerName(String customerName) {
        this.customerName = customerName;
    }

    public String getEndTime() {
        return endTime;
    }

    public void setEndTime(String endTime) {
        this.endTime = endTime;
    }

    public String getStartTime() {
        return startTime;
    }

    public void setStartTime(String startTime) {
        this.startTime = startTime;
    }

    public void setParkingSpace(String parkingSpace) {
        this.parkingSpace = parkingSpace;
    }


    

}