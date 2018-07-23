import { CanActivate } from "@angular/router"
import { Injectable } from "@angular/core"
import { AuthService } from "./auth.service"
import { Observable } from "rxjs/Observable"

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService) { }

  canActivate(): boolean | Observable<boolean> | Promise<boolean> {
    return this.authService.isAutenticado()
  }

}