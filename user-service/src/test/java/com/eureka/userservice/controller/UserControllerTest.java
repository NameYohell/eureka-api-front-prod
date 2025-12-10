package com.eureka.userservice.controller;

import com.eureka.userservice.dto.UserDTO;
import com.eureka.userservice.service.UserService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.util.Arrays;
import java.util.List;

import static org.hamcrest.Matchers.hasSize;
import static org.hamcrest.Matchers.is;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(UserController.class)
class UserControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private UserService userService;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    void testGetAllUsers_ReturnsListOfUsers() throws Exception {
        // Given
        UserDTO user1 = new UserDTO();
        user1.setId(1L);
        user1.setName("Juan Pérez");
        user1.setEmail("juan.perez@example.com");
        user1.setArea("Tecnología");
        user1.setActive(true);

        UserDTO user2 = new UserDTO();
        user2.setId(2L);
        user2.setName("María García");
        user2.setEmail("maria.garcia@example.com");
        user2.setArea("Ventas");
        user2.setActive(true);

        List<UserDTO> users = Arrays.asList(user1, user2);
        when(userService.getAllUsers()).thenReturn(users);

        // When & Then
        mockMvc.perform(get("/api/users")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$", hasSize(2)))
                .andExpect(jsonPath("$[0].id", is(1)))
                .andExpect(jsonPath("$[0].name", is("Juan Pérez")))
                .andExpect(jsonPath("$[0].email", is("juan.perez@example.com")))
                .andExpect(jsonPath("$[0].area", is("Tecnología")))
                .andExpect(jsonPath("$[1].id", is(2)))
                .andExpect(jsonPath("$[1].name", is("María García")))
                .andExpect(jsonPath("$[1].email", is("maria.garcia@example.com")))
                .andExpect(jsonPath("$[1].area", is("Ventas")));
    }
}
