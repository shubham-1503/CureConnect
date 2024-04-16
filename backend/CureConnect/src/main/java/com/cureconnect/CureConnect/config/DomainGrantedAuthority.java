package com.cureconnect.CureConnect.config;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.GrantedAuthority;

@RequiredArgsConstructor
public class DomainGrantedAuthority implements GrantedAuthority {

    private final EntityType entityType;
    private final Permission permission;

    @Override
    public String getAuthority() {
        return entityType +
                ":" +
                permission;
    }
}