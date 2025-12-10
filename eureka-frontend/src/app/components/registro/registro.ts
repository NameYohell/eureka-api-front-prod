import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { UserService } from '../../services/user';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './registro.html',
  styleUrl: './registro.css'
})
export class RegistroComponent {
  user: User = {
    name: '',
    email: '',
    area: ''
  };

  showAlert = false;
  alertType: 'success' | 'error' = 'success';
  alertMessage = '';
  isSubmitting = false;

  constructor(private userService: UserService) {}

  onSubmit(form: NgForm) {
    if (form.invalid) {
      // Marcar todos los campos como tocados para mostrar errores
      Object.keys(form.controls).forEach(key => {
        form.controls[key].markAsTouched();
      });
      this.showAlertMessage('error', 'Por favor, complete todos los campos obligatorios correctamente.');
      return;
    }

    this.isSubmitting = true;
    
    this.userService.createUser(this.user).subscribe({
      next: (response) => {
        console.log('Usuario registrado:', response);
        this.showAlertMessage('success', `Personal registrado exitosamente. Email: ${response.email}`);
        this.resetForm(form);
        this.isSubmitting = false;
      },
      error: (error) => {
        console.error('Error al registrar:', error);
        let errorMsg = 'Error al registrar el personal. ';
        
        if (error.status === 400) {
          errorMsg += 'Verifique que el correo no esté duplicado.';
        } else if (error.error?.message) {
          errorMsg += error.error.message;
        } else {
          errorMsg += 'Por favor, intente nuevamente.';
        }
        
        this.showAlertMessage('error', errorMsg);
        this.isSubmitting = false;
      }
    });
  }

  showAlertMessage(type: 'success' | 'error', message: string) {
    this.alertType = type;
    this.alertMessage = message;
    this.showAlert = true;

    // Auto-cerrar después de 5 segundos
    setTimeout(() => {
      this.closeAlert();
    }, 5000);
  }

  closeAlert() {
    this.showAlert = false;
  }

  resetForm(form: NgForm) {
    form.resetForm();
    this.user = {
      name: '',
      email: '',
      area: ''
    };
  }
}
