import { Component, inject } from '@angular/core';
import { UserService } from '../../services/user';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  private readonly _userService = inject(UserService);
  private readonly _router = inject(Router);

  logout() {
    this._userService.logout().subscribe({
      next: (res) => {
        this._router.navigate(['/signin']);
      },
    });
  }
}
