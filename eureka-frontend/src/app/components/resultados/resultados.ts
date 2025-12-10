import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { UserService } from '../../services/user';
import { User } from '../../models/user.model';

interface AreaStats {
  area: string;
  count: number;
  percentage: number;
}

@Component({
  selector: 'app-resultados',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './resultados.html',
  styleUrl: './resultados.css'
})
export class ResultadosComponent implements OnInit, OnDestroy {
  users: User[] = [];
  loading = true;
  showAlert = false;
  alertMessage = '';
  areaStats: AreaStats[] = [];
  private refreshInterval: any;

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.loadUsers();
    // Actualizar automáticamente cada 30 segundos
    this.refreshInterval = setInterval(() => {
      this.loadUsers();
    }, 30000);
  }

  ngOnDestroy() {
    // Limpiar el intervalo al destruir el componente
    if (this.refreshInterval) {
      clearInterval(this.refreshInterval);
    }
  }

  loadUsers() {
    this.loading = true;
    this.userService.getAllUsers().subscribe({
      next: (data) => {
        this.users = data;
        this.calculateAreaStats();
        this.loading = false;
      },
      error: (error) => {
        console.error('Error al cargar usuarios:', error);
        this.loading = false;
        this.showAlertMessage('Error al cargar los datos');
      }
    });
  }

  calculateAreaStats() {
    const areaCount = new Map<string, number>();
    
    this.users.forEach(user => {
      if (user.area) {
        areaCount.set(user.area, (areaCount.get(user.area) || 0) + 1);
      }
    });

    const total = this.users.length;
    this.areaStats = Array.from(areaCount.entries())
      .map(([area, count]) => ({
        area,
        count,
        percentage: total > 0 ? (count / total) * 100 : 0
      }))
      .sort((a, b) => b.count - a.count);
  }

  deleteUser(id: number, name: string) {
    if (confirm(`¿Está seguro de eliminar a ${name}?`)) {
      this.userService.deleteUser(id).subscribe({
        next: () => {
          this.showAlertMessage(`Usuario ${name} eliminado exitosamente`);
          this.loadUsers();
        },
        error: (error) => {
          console.error('Error al eliminar:', error);
          this.showAlertMessage('Error al eliminar el usuario');
        }
      });
    }
  }

  showAlertMessage(message: string) {
    this.alertMessage = message;
    this.showAlert = true;
    setTimeout(() => {
      this.showAlert = false;
    }, 3000);
  }

  getBadgeClass(area: string): string {
    const classes: { [key: string]: string } = {
      'Ventas': 'bg-success',
      'Recursos Humanos': 'bg-info',
      'Tecnología': 'bg-primary',
      'Marketing': 'bg-warning',
      'Finanzas': 'bg-danger',
      'Operaciones': 'bg-secondary',
      'Administración': 'bg-dark',
      'Logística': 'bg-primary'
    };
    return classes[area] || 'bg-secondary';
  }

  getActiveUsersCount(): number {
    return this.users.filter(user => user.active).length;
  }
}
