# ParkoPedia

## Technologies
```
Java
Maven
Spring-Boot
Spring-JPA
Embedded Tomcat
MongoDB
MongoDB-Atlas
HTML
CSS
JavaScript
JQuery
BootStrap
```

## Functionalities
```
Responsive and Mobile Friendly UI
Single Page Application
Login
Book Parking
Booking List
About
Pricing
FeedBack
ReachUs
Logout
```

## Software Required


Java version 11
installation steps reference - https://docs.oracle.com/en/java/javase/11/install/installation-jdk-microsoft-windows-platforms.html#GUID-A7E27B90-A28D-4237-9383-A58B416071CA

Maven 3.6.3
installation steps reference - https://maven.apache.org/install.html


## Project Build Commands
```
remove target directory - mvn clean
build artifactory - mvn install
build and execute the project - mvn spring-boot:run
```

## MongoDB Collections
```
document -> user
sample record : {"_id":{"$oid":"5ee4c3cbcbf815d2ea657cc2"},"username":"user@gmail.com","password":"****"}

document -> feedBack
sample record : {"_id":{"$oid":"5ee4c6b476d029664b505296"},"message":"This site is mobile friendly which made my life easy","_class":"com.parkopedia.project.feedback.FeedBack"}

document -> parkingSlot
sample record : {"_id":{"$oid":"5ee4c60c76d029664b505295"},"parkingSpace":"7","startTime":"2020-06-13T17:55","endTime":"2020-08-13T17:55","customerName":"Reece Shah","type":"Student","regNum":"CU57ABC2","_class":"com.parkopedia.project.parkingslot.ParkingSlot"}
```

## Java Claases
```java
Application.java
package com.parkopedia.project;
...
/**
 * Flow start from here
 * @author Reece Shah/1519992
 */
@SpringBootApplication
public class Application {
    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }
}

User.java
/**
 * User Model.
 * @author Reece Shah/1519992
 */
@Document
public class User {
...
}

UserRepository.java
/**
 * User JPA Repository to hit database.
 * @author Reece Shah/1519992
 */
@Repository
public interface UserRepository extends MongoRepository<User, String> {
...
}

ParkingSlot.java
/**
 * parking slot POJO.
 * @author Reece Shah/1519992
 */
@Document
public class ParkingSlot {
....
}

/**
 * Parking slot Rest Controller to serve rest points.
 * @author Reece Shah/1519992
 */
@RestController
@RequestMapping("/v1/slots")
public class ParkingSlotController {
...
}

/**
 * Parking slot JPA Repository to hit database.
 * @author Reece Shah/1519992
 */
@Repository
public interface ParkingSlotRepository extends MongoRepository<ParkingSlot,String>{
    
}


/**
 * FeedBack Model.
 * 
 * @author Reece Shah/1519992
 */
@Document
public class FeedBack {
...
}
/**
 * FeedBack Rest Controller to serve rest points.
 * 
 * @author Reece Shah/1519992
 */
@RestController
@RequestMapping("/v1/feedback")
public class FeedBackController {
...
}

/**
 * FeedBack Repository to hit database.
 * 
 * @author Reece Shah/1519992
 */
@Repository
public interface FeedBackRepository extends MongoRepository<FeedBack,String>{
    
}
```

## Api Calls
```
Get Mapping - /parkopedia/v1/slots 
Post Mapping - /parkopedia/v1/user/auth
input -> {username: "user@gmail.com", password: "*****"}
Post Mapping - /parkopedia/v1/feedback
input -> {"message":"This site is mobile friendly which made my life easy"}
Post Mapping - /parkopedia/v1/slots
input -> {"parkingSpace":"7","startTime":"2020-06-13T17:55","endTime":"2020-08-13T17:55","customerName":"Reece Shah","type":"Student","regNum":"CU57ABC2","_class":"com.parkopedia.project.parkingslot.ParkingSlot"}
```

## JS Code
```
Input Validations
Making Ajax Calls
Handling Events
Manipulating Dom
```







