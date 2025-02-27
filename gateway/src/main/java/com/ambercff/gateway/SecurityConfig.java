package com.ambercff.gateway;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.reactive.EnableWebFluxSecurity;
import org.springframework.security.config.web.server.ServerHttpSecurity;
import org.springframework.security.oauth2.client.registration.ReactiveClientRegistrationRepository;
import org.springframework.security.oauth2.client.web.OAuth2AuthorizationRequestCustomizers;
import org.springframework.security.oauth2.client.web.server.DefaultServerOAuth2AuthorizationRequestResolver;
import org.springframework.security.oauth2.client.web.server.ServerOAuth2AuthorizationRequestResolver;
import org.springframework.security.oauth2.jwt.NimbusReactiveJwtDecoder;
import org.springframework.security.oauth2.jwt.ReactiveJwtDecoder;
import org.springframework.security.web.server.SecurityWebFilterChain;
import org.springframework.security.web.server.authentication.RedirectServerAuthenticationSuccessHandler;

@Configuration
@EnableWebFluxSecurity
public class SecurityConfig {
    @Autowired
    private ReactiveClientRegistrationRepository clientRegistrationRepository;

    @Value("${spring.security.oauth2.client.provider.azure.jwk-set-uri}")
    private String jwkSetUri;

    @Bean
    SecurityWebFilterChain securityWebFilterChain(ServerHttpSecurity http){
        http.csrf(ServerHttpSecurity.CsrfSpec::disable).cors(ServerHttpSecurity.CorsSpec::disable);
        http.authorizeExchange(conf -> conf
                        .pathMatchers("/login").permitAll()
                        .anyExchange().authenticated())
                .oauth2Login(conf -> conf
//                        .authorizationRequestResolver(authorizationRequestResolver(clientRegistrationRepository))
                        .authenticationSuccessHandler(new RedirectServerAuthenticationSuccessHandler("http://localhost:3000/profile")))
                .oauth2ResourceServer(conf -> conf
                        .jwt(jwt -> jwt.jwtDecoder(jwtDecoder())));
        return http.build();
    }

    @Bean
    public ReactiveJwtDecoder jwtDecoder(){
        return NimbusReactiveJwtDecoder.withJwkSetUri(jwkSetUri).build();
    }

//    private ServerOAuth2AuthorizationRequestResolver authorizationRequestResolver(ReactiveClientRegistrationRepository clientRegistrationRepository) {
//        var authorizationRequestResolver = new DefaultServerOAuth2AuthorizationRequestResolver(clientRegistrationRepository);
//        authorizationRequestResolver.setAuthorizationRequestCustomizer(OAuth2AuthorizationRequestCustomizers.withPkce());
//        return authorizationRequestResolver;
//    }
}
