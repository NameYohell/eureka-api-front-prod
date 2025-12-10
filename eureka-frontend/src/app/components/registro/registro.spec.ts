import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RegistroComponent } from './registro';
import { UserService } from '../../services/user';

describe('RegistroComponent', () => {
  let component: RegistroComponent;
  let fixture: ComponentFixture<RegistroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RegistroComponent,
        FormsModule,
        HttpClientTestingModule
      ],
      providers: [UserService]
    }).compileComponents();

    fixture = TestBed.createComponent(RegistroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have empty user model initially', () => {
    // Given - componente recién creado
    // Then - modelo vacío
    expect(component.user.name).toBe('');
    expect(component.user.email).toBe('');
    expect(component.user.area).toBe('');
  });

  it('should update user model properties', () => {
    // When - actualizar propiedades del usuario
    component.user.name = 'Juan Pérez';
    component.user.email = 'juan@example.com';
    component.user.area = 'Tecnología';
    
    // Then - verificar que se actualizaron
    expect(component.user.name).toBe('Juan Pérez');
    expect(component.user.email).toBe('juan@example.com');
    expect(component.user.area).toBe('Tecnología');
  });

  it('should have showAlert as false initially', () => {
    // Given - componente recién creado
    // Then - alerta oculta y no está enviando
    expect(component.showAlert).toBeFalsy();
    expect(component.isSubmitting).toBeFalsy();
  });

  it('should have default alertType as success', () => {
    // Given - componente recién creado
    // Then - tipo de alerta por defecto es success
    expect(component.alertType).toBe('success');
  });

  it('should have UserService injected', () => {
    // Given - componente creado con dependencias
    // Then - servicio debe estar inyectado
    expect(component['userService']).toBeDefined();
  });
});
