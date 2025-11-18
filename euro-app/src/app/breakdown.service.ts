import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

export interface Breakdown {
  [denomination: string]: number;
}

interface BreakdownResponse {
  breakdown: Breakdown;
}

@Injectable({
  providedIn: 'root',
})
export class BreakdownService {
  // Backend-Endpunkt
  private readonly baseUrl = 'http://localhost:8080/api/breakdown';

  constructor(private http: HttpClient) {}

  calculateBackend(amount: string): Observable<Breakdown> {
    return this.http
      .post<BreakdownResponse>(this.baseUrl, { amount })
      .pipe(map((res) => res.breakdown));
  }
}
