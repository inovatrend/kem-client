import {Injectable} from '@angular/core';
import {HttpClient, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable, of, Subscription} from 'rxjs';
import {Router} from '@angular/router';
import {delay} from 'rxjs/operators';
import {JwtHelperService} from '@auth0/angular-jwt';
import {AuthService} from './auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  private timeout: number;
  tokenSubscription = new Subscription()

  constructor(private http: HttpClient,
              private router: Router,
              private jwtHelper: JwtHelperService,
              private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('token');

    if (!token) {
      this.router.navigate(['/']);
      return next.handle(req);
    }

    const req1 = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${token}`),
    });

    this.timeout = this.jwtHelper.getTokenExpirationDate(token).valueOf() - new Date().valueOf();
    this.expirationCounter(this.timeout);

    return next.handle(req1);
  }

  expirationCounter(timeout) {
    this.tokenSubscription.unsubscribe();
    this.tokenSubscription = of(null).pipe(delay(timeout)).subscribe((expired) => {
      console.log('EXPIRED!!');

      this.authService.logout();
      this.router.navigate(["/login"]);
    });
  }
}
