import { Component } from '@angular/core';
import { NgIf } from '@angular/common';
import { Router } from '@angular/router';
@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [NgIf],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.css'
})
export class NavigationComponent {
  isHidden = false;

  constructor (private router: Router) {}

  navigateTo(route: String) {
    this.router.navigate([route]);
  }

  toggleSidebar() {
    this.isHidden = !this.isHidden
  }
}
