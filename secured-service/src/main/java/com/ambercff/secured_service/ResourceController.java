package com.ambercff.secured_service;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ResourceController {

    @GetMapping("/resource")
    @CrossOrigin(origins = "http://localhost:3000")
    public String getResourceString(@AuthenticationPrincipal Jwt jwt) {
        var strBuilder = new StringBuilder();
        strBuilder.append("<p> JWT Token: %s </p>".formatted(jwt.getTokenValue()));
        strBuilder.append("<p> JWT Headers: %s </p>".formatted(jwt.getHeaders()));
        strBuilder.append("<p> JWT Claims: %s </p>".formatted(jwt.getClaims()));
        strBuilder.append("<p> Resource server accessed by: %s (with subject: %s) </p>".formatted(jwt.getSubject(), jwt.getSubject()));

        return strBuilder.toString();
    }
}

