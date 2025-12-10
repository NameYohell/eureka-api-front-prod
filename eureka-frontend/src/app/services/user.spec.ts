import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UserService } from './user';
import { User } from '../models/user.model';

describe('UserService', () => {
  let service: UserService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserService]
    });
    service = TestBed.inject(UserService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return users from getAllUsers()', () => {
    // Given
    const mockUsers: User[] = [
      {
        id: 1,
        name: 'Juan Pérez',
        email: 'juan@example.com',
        area: 'Tecnología',
        active: true
      },
      {
        id: 2,
        name: 'María García',
        email: 'maria@example.com',
        area: 'Ventas',
        active: true
      }
    ];

    // When
    service.getAllUsers().subscribe((users) => {
      // Then
      expect(users).toEqual(mockUsers);
      expect(users.length).toBe(2);
      expect(users[0].name).toBe('Juan Pérez');
      expect(users[1].name).toBe('María García');
    });

    const req = httpMock.expectOne('http://localhost:8080/api/users');
    expect(req.request.method).toBe('GET');
    req.flush(mockUsers);
  });
});
