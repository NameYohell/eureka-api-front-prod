package com.eureka.userservice.service;

import com.eureka.userservice.dto.UserDTO;
import com.eureka.userservice.exception.DuplicateResourceException;
import com.eureka.userservice.model.User;
import com.eureka.userservice.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class UserServiceTest {

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private UserService userService;

    private UserDTO userDTO;

    @BeforeEach
    void setUp() {
        userDTO = new UserDTO();
        userDTO.setName("Juan Pérez");
        userDTO.setEmail("juan.perez@example.com");
        userDTO.setArea("Tecnología");
        userDTO.setActive(true);
    }

    @Test
    void testCreateUser_Success() {
        // Given
        when(userRepository.existsByEmail(anyString())).thenReturn(false);
        
        User savedUser = new User();
        savedUser.setId(1L);
        savedUser.setName(userDTO.getName());
        savedUser.setEmail(userDTO.getEmail());
        savedUser.setArea(userDTO.getArea());
        savedUser.setActive(true);
        
        when(userRepository.save(any(User.class))).thenReturn(savedUser);

        // When
        UserDTO result = userService.createUser(userDTO);

        // Then
        assertNotNull(result);
        assertEquals(1L, result.getId());
        assertEquals("Juan Pérez", result.getName());
        assertEquals("juan.perez@example.com", result.getEmail());
        assertEquals("Tecnología", result.getArea());
        assertTrue(result.getActive());
        
        verify(userRepository, times(1)).existsByEmail("juan.perez@example.com");
        verify(userRepository, times(1)).save(any(User.class));
    }

    @Test
    void testCreateUser_DuplicateEmail_ThrowsException() {
        // Given
        when(userRepository.existsByEmail(anyString())).thenReturn(true);

        // When & Then
        DuplicateResourceException exception = assertThrows(
            DuplicateResourceException.class,
            () -> userService.createUser(userDTO)
        );
        
        assertEquals("Ya existe un usuario con el email: juan.perez@example.com", exception.getMessage());
        verify(userRepository, times(1)).existsByEmail("juan.perez@example.com");
        verify(userRepository, never()).save(any(User.class));
    }
}
