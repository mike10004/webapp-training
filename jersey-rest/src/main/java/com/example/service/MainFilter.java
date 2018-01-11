package com.example.service;

import java.io.IOException;

@javax.servlet.annotation.WebFilter(filterName = "MainFilter", urlPatterns = {"/*"})
public class MainFilter implements javax.servlet.Filter {
    public void destroy() {
    }

    public void doFilter(javax.servlet.ServletRequest req, javax.servlet.ServletResponse resp, javax.servlet.FilterChain chain) throws javax.servlet.ServletException, IOException {
    }

    public void init(javax.servlet.FilterConfig config) throws javax.servlet.ServletException {
    }

}
