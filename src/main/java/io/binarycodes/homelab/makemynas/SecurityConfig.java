package io.binarycodes.homelab.makemynas;

import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;

import com.vaadin.flow.spring.security.VaadinWebSecurity;
import com.vaadin.hilla.route.RouteUtil;

@Configuration
@EnableWebSecurity
public class SecurityConfig extends VaadinWebSecurity {

    private final RouteUtil routeUtil;

    public SecurityConfig(RouteUtil routeUtil) {
        this.routeUtil = routeUtil;
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.authorizeHttpRequests(registry -> {
            registry.requestMatchers(routeUtil::isRouteAllowed).permitAll();
            registry.requestMatchers("/", "/register-storage", "/view-storage").permitAll();
        });

        super.configure(http);
        http.oauth2Login(Customizer.withDefaults())
                .logout(Customizer.withDefaults());
    }
}