import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ResultadosComponent } from './resultados';
import { UserService } from '../../services/user';
import { User } from '../../models/user.model';

describe('ResultadosComponent', () => {
  let component: ResultadosComponent;
  let fixture: ComponentFixture<ResultadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ResultadosComponent,
        HttpClientTestingModule
      ],
      providers: [UserService]
    }).compileComponents();

    fixture = TestBed.createComponent(ResultadosComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should calculate area statistics correctly', () => {
    // Given - usuarios de diferentes áreas
    component.users = [
      { id: 1, name: 'User 1', email: 'user1@test.com', area: 'Tecnología', active: true },
      { id: 2, name: 'User 2', email: 'user2@test.com', area: 'Tecnología', active: true },
      { id: 3, name: 'User 3', email: 'user3@test.com', area: 'Ventas', active: true },
      { id: 4, name: 'User 4', email: 'user4@test.com', area: 'Marketing', active: true },
      { id: 5, name: 'User 5', email: 'user5@test.com', area: 'Tecnología', active: true }
    ];

    // When
    component.calculateAreaStats();

    // Then
    expect(component.areaStats.length).toBe(3);
    
    // Tecnología debe tener 3 usuarios (60%)
    const techArea = component.areaStats.find(stat => stat.area === 'Tecnología');
    expect(techArea).toBeDefined();
    expect(techArea?.count).toBe(3);
    expect(techArea?.percentage).toBe(60);
    
    // Ventas debe tener 1 usuario (20%)
    const salesArea = component.areaStats.find(stat => stat.area === 'Ventas');
    expect(salesArea).toBeDefined();
    expect(salesArea?.count).toBe(1);
    expect(salesArea?.percentage).toBe(20);
    
    // Marketing debe tener 1 usuario (20%)
    const marketingArea = component.areaStats.find(stat => stat.area === 'Marketing');
    expect(marketingArea).toBeDefined();
    expect(marketingArea?.count).toBe(1);
    expect(marketingArea?.percentage).toBe(20);
  });

  it('should sort areas by count in descending order', () => {
    // Given
    component.users = [
      { id: 1, name: 'User 1', email: 'user1@test.com', area: 'Ventas', active: true },
      { id: 2, name: 'User 2', email: 'user2@test.com', area: 'Tecnología', active: true },
      { id: 3, name: 'User 3', email: 'user3@test.com', area: 'Tecnología', active: true },
      { id: 4, name: 'User 4', email: 'user4@test.com', area: 'Tecnología', active: true }
    ];

    // When
    component.calculateAreaStats();

    // Then - debe estar ordenado por count descendente
    expect(component.areaStats[0].area).toBe('Tecnología');
    expect(component.areaStats[0].count).toBe(3);
    expect(component.areaStats[1].area).toBe('Ventas');
    expect(component.areaStats[1].count).toBe(1);
  });

  it('should handle empty user list', () => {
    // Given
    component.users = [];

    // When
    component.calculateAreaStats();

    // Then
    expect(component.areaStats.length).toBe(0);
  });

  it('should calculate correct percentages with decimal precision', () => {
    // Given - 3 usuarios para obtener porcentajes decimales
    component.users = [
      { id: 1, name: 'User 1', email: 'user1@test.com', area: 'Tecnología', active: true },
      { id: 2, name: 'User 2', email: 'user2@test.com', area: 'Tecnología', active: true },
      { id: 3, name: 'User 3', email: 'user3@test.com', area: 'Ventas', active: true }
    ];

    // When
    component.calculateAreaStats();

    // Then - 2/3 = 66.666...%
    const techArea = component.areaStats.find(stat => stat.area === 'Tecnología');
    expect(techArea?.percentage).toBeCloseTo(66.67, 2);
    
    // 1/3 = 33.333...%
    const salesArea = component.areaStats.find(stat => stat.area === 'Ventas');
    expect(salesArea?.percentage).toBeCloseTo(33.33, 2);
  });
});
