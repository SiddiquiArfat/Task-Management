package com.Task.Task.Config;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;

import java.util.Collections;

@Configuration
public class SecurityConfig {
    @Bean
    public SecurityFilterChain taskConfig(HttpSecurity http) throws Exception {
        http.cors(cors ->{
                    cors.configurationSource(new CorsConfigurationSource() {
                        @Override
                        public CorsConfiguration getCorsConfiguration(HttpServletRequest request) {
                            CorsConfiguration cc= new CorsConfiguration();
                            cc.setAllowedOriginPatterns(Collections.singletonList("*"));
                            cc.setAllowedMethods(Collections.singletonList("*"));
                            cc.setAllowCredentials(false);
                            cc.setExposedHeaders(Collections.singletonList("*"));
                            cc.setAllowedHeaders(Collections.singletonList("*"));
                            return cc;
                        }
                    });
                })



        .authorizeHttpRequests(auth ->{
        auth.requestMatchers(HttpMethod.POST, "/AddUser").permitAll()
//        .requestMatchers(HttpMethod.GET, "/projects/**").permitAll()
        .anyRequest().authenticated();
        }).csrf(csrf -> csrf.disable())
        .formLogin().loginPage("/login").defaultSuccessUrl("http://127.0.0.1:5500/website/home.html").permitAll();
//                .formLogin(Customizer.withDefaults());
        return http.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder();
    }
}
