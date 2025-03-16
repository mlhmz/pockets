package xyz.mlhmz.savingscategorization.controllers;

import com.fasterxml.jackson.annotation.JsonProperty;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class ReactRoutingController {
    @RequestMapping(value = {"/app", "/app/**", "/not-found"})
    public String forwardToReact() {
        return "forward:/index.html";
    }
}
