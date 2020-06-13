package com.parkopedia.project.feedback;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * FeedBack Rest Controller to serve rest points.
 * 
 * @author Reece Shah/1519992
 */
@RestController
@RequestMapping("/v1/feedback")
public class FeedBackController {

    @Autowired
    private FeedBackRepository feedbackRepository;
    
    @PostMapping("")
    public String saveFeedBack(@RequestBody FeedBack feedback){
        feedbackRepository.save(feedback);
        return "Success";
    }
}