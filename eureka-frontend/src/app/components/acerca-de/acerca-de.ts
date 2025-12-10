import { Component } from '@angular/core';

@Component({
  selector: 'app-acerca-de',
  standalone: true,
  imports: [],
  templateUrl: './acerca-de.html',
  styleUrl: './acerca-de.css'
})
export class AcercaDeComponent {
  projectName = 'Sistema Eureka';
  version = '1.0.0';
}
