import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { RouterOutlet, RouterModule } from '@angular/router';
import { NavigationComponent } from './navigation/navigation.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterModule, NavigationComponent,],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  @ViewChild(NavigationComponent) sidebar!: NavigationComponent;

  isSidebarHidden = false;
  ngAfterViewInit() {
    if (this.sidebar) {
      this.isSidebarHidden = this.sidebar.isHidden;
    }
  }

  get sidebarHidden(): boolean {
    return this.isSidebarHidden; 
  }

  toggleSidebar() {
    if (this.sidebar) {
      this.sidebar.toggleSidebar();
      this.isSidebarHidden = this.sidebar.isHidden;
    }
  }
}
