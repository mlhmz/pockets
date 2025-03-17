package xyz.mlhmz.savingscategorization.controllers;

import com.fasterxml.jackson.annotation.JsonProperty;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class OidcConfigController {
    @GetMapping("/oidc-config")
    public OidcConfig oidcConfig() {
        return new OidcConfig(
                System.getenv("FRONTEND_OIDC_AUTHORITY"),
                System.getenv("FRONTEND_CLIENT_ID"),
                System.getenv("FRONTEND_REDIRECT_URI")
        );
    }

    public record OidcConfig(
            String authority,
            @JsonProperty("client_id")
            String clientId,
            @JsonProperty("redirect_uri")
            String redirectUri) {
    }
}
