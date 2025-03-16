package xyz.mlhmz.savingscategorization.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class ReactRoutingController {
    @RequestMapping(value = {"/app", "/app/**", "/not-found"})
    public String forwardToReact() {
        return "forward:/index.html";
    }
}
