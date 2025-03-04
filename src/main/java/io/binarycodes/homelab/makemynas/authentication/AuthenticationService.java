package io.binarycodes.homelab.makemynas.authentication;

import org.springframework.security.core.context.SecurityContextHolder;

import com.vaadin.flow.server.auth.AnonymousAllowed;
import com.vaadin.hilla.BrowserCallable;

@BrowserCallable
@AnonymousAllowed
public class AuthenticationService {

    public boolean isUserLoggedIn() {
        var auth = SecurityContextHolder.getContext().getAuthentication();
        return auth != null && auth.isAuthenticated() && auth.getPrincipal() != null;
    }
}
