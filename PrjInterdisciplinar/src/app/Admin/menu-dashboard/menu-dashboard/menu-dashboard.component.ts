import { Component, Input } from '@angular/core';

import { CommonModule } from '@angular/common';
import { OpcoesSidebarMenuAdmin } from '../../OpcoesSidebarMenuAdmin.enum';

@Component({
  selector: 'app-menu-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './menu-dashboard.component.html',
  styleUrl: './menu-dashboard.component.css'
})
export class MenuDashboardComponent {
  @Input() teste : OpcoesSidebarMenuAdmin = OpcoesSidebarMenuAdmin.Doenca;
}
