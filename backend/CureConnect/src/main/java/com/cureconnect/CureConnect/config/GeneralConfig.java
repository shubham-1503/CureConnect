package com.cureconnect.CureConnect.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationConverter;
import org.springframework.security.web.SecurityFilterChain;

import java.util.Collection;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true, securedEnabled = true)
public class GeneralConfig {

    /**
     * Configures the security filter chain for HTTP requests.
     *
     * @param http The HttpSecurity object used to configure security.
     * @return The configured SecurityFilterChain.
     * @throws Exception If an error occurs during configuration.
     */
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .csrf(AbstractHttpConfigurer::disable)
                .sessionManagement(
                        httpSecuritySessionManagementConfigurer ->
                                httpSecuritySessionManagementConfigurer.sessionCreationPolicy(
                                        SessionCreationPolicy.STATELESS))
                .authorizeHttpRequests(authorize -> authorize
                        .requestMatchers(HttpMethod.POST, "/api/v1/doctor/**").hasAuthority("ROLE:DOCTOR")
                        .requestMatchers(HttpMethod.GET, "/api/v1/doctor/**").hasAuthority("ROLE:DOCTOR")
                        .requestMatchers(HttpMethod.GET, "/api/v1/doctor/getAllApprovedDoctors", "/api/v1/user/**").hasAuthority("ROLE:PATIENT")
                        .requestMatchers(HttpMethod.POST, "/api/v1/user/register").hasAuthority("ROLE:PATIENT")
                        .requestMatchers(HttpMethod.POST, "/api/v1/user/register").hasAuthority("ROLE:DOCTOR")
                        .requestMatchers(HttpMethod.POST, "/api/v1/user/register").hasAuthority("ROLE:ADMIN")
                        .requestMatchers(HttpMethod.POST, "/api/v1/inventory/**").hasAuthority("ROLE:ADMIN")
                        .requestMatchers(HttpMethod.GET, "/api/v1/inventory/**").hasAuthority("ROLE:ADMIN")
                        .requestMatchers(HttpMethod.PUT, "/api/v1/inventory/updateInventory").hasAuthority("ROLE:PATIENT")
                        .requestMatchers(HttpMethod.GET, "/api/v1/inventory/fetchAll").hasAuthority("ROLE:PATIENT")
                        .requestMatchers(HttpMethod.POST, "/api/v1/appointment/**").hasAuthority("ROLE:DOCTOR")
                        .requestMatchers(HttpMethod.GET, "/api/v1/appointment/getAppointmentByDate/**", "/api/v1/appointment/getAllAppointment/**", "/api/v1/appointment/getAppointmentsCompleted/**", "/api/v1/appointment/getPatientsTreated/**", "/api/v1/appointment/getEarningForMonth/**", "/api/v1/appointment/getTotalEarnings/**", "/api/v1/appointment/patient/**").hasAuthority("ROLE:DOCTOR")
                        .requestMatchers(HttpMethod.GET, "/api/v1/appointment/getAppointmentByDate/**", "/api/v1/appointment/getAllAppointment/**", "/api/v1/appointment/getAppointmentFromToday", "/api/v1/appointment/patient/**").hasAuthority("ROLE:PATIENT")
                        .requestMatchers(HttpMethod.PUT, "/api/v1/appointment/updatePrescription").hasAuthority("ROLE:DOCTOR")
                        .requestMatchers(HttpMethod.PUT, "/api/v1/appointment/update").hasAuthority("ROLE:PATIENT")
                        .requestMatchers(HttpMethod.DELETE, "/api/v1/appointment/deleteById/**").hasAuthority("ROLE:DOCTOR")
                        .anyRequest().authenticated())
                .oauth2ResourceServer(oauth2 -> oauth2
                        .jwt()
                        .jwtAuthenticationConverter(jwtAuthenticationConverter())
                );
        return http.build();
    }

    public JwtAuthenticationConverter jwtAuthenticationConverter() {
        JwtAuthenticationConverter converter = new JwtAuthenticationConverter();

        converter.setJwtGrantedAuthoritiesConverter(jwt ->
                Optional.ofNullable(jwt.getClaimAsStringList("custom_claims"))
                        .stream()
                        .flatMap(Collection::stream)
                        .flatMap(claim -> {
                            var parts = claim.split(":", 2);

                            EntityType entityType;
                            Permission permission;

                            try {
                                entityType = EntityType.valueOf(parts[0]);
                                permission = Permission.valueOf(parts[1]);
                            } catch (IllegalArgumentException e) {
                                return Stream.empty();
                            }

                            return Stream.of(new DomainGrantedAuthority(entityType, permission));
                        })
                        .collect(Collectors.toList()));

        return converter;
    }
}