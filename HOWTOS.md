# How-tos

### How to include a new membership testimonials
* Website https://jakarta.ee/membership/ randomly displays a series of membership testimonials.
* Echa testimonial is around 400 characters long.
* To add a new quote, a Github issue and Pull-Request can be sent to https://github.com/jakartaee/jakarta.ee repository. 
* Pull-request should contains a new `.yml` file in the folder `data/membership/testimonials/` with the folling format: 
    ```
    testimonial: "testimonial text no longer than 450 characters"
    title: "<Author of the testimonial> , <Organization>"
    ```
* Example of PR: https://github.com/jakartaee/jakarta.ee/pull/1097/files  
