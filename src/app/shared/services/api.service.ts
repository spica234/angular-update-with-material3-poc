import { LoaderService } from '@/app/shared/services/loader.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { finalize, map, Observable } from 'rxjs';

/**
 * Service responsible for handling HTTP requests to the News API.
 *
 * @remarks
 * This service provides methods for making HTTP requests (GET, POST, PUT, DELETE)
 * while managing loading states automatically. It includes authentication and
 * URL construction for the News API endpoints.
 *
 * @example
 * ```typescript
 * // Making a GET request
 * this.apiService.get<NewsResponse>({
 *   query: 'technology',
 *   from: '2023-01-01',
 *   to: '2023-12-31',
 *   sortBy: 'publishedAt'
 * });
 * ```
 */
@Injectable({
  providedIn: 'root',
})
export class ApiService {

  /**
   * The base endpoint for all requests to the News API service.
   *
   * @remarks
   * This constant is used as the foundational URL for constructing
   * HTTP requests to News API endpoints.
   */
  private readonly BASE_URL = 'https://randomuser.me/api/';

  constructor(
    private readonly _http: HttpClient,
    private readonly _loaderService: LoaderService
  ) { }

  /**
   * Retrieves data from the server using the specified query parameters.
   * Displays a loading indicator before the request and hides it once the request
   * completes or errors out.
   *
   * @template T The type of the data expected from the server response.
   * @param requestParams An object containing the necessary configuration for the request.
   * @returns An Observable that emits the server response of type T.
   */
  get<T>(queryParam: Record<string, string | number>): Observable<T> {
    this._loaderService.start();
    return this._http.get<Record<'results', T>>(this.constructUrl(queryParam))
      .pipe(
        map((data: Record<'results', T>) => data.results),
        finalize(() => this._loaderService.stop())
      );
  }

  /**
   * Sends a POST request with the provided payload.
   *
   * @template T The expected response type.
   * @param requestPayload The body of the POST request.
   * @returns An observable that emits the response data of type T.
   */
  post<T>(endPoint: string, requestPayload: object): Observable<T> {
    this._loaderService.start();
    return this._http.post<T>(this.constructUrl({ endPoint }), requestPayload)
      .pipe(
        finalize(() => this._loaderService.stop())
      );
  }

  /**
   * Sends a PUT request to the server with the provided payload.
   *
   * @template T - The type of the expected response.
   * @param requestPayload - The request body to be sent.
   * @returns An observable that emits the response of type T.
   */
  put<T>(requestPayload: object): Observable<T> {
    this._loaderService.start();
    return this._http.put<T>(this.constructUrl({}), requestPayload)
      .pipe(
        finalize(() => this._loaderService.stop())
      );
  }

  /**
   * Performs an HTTP DELETE request to the specified endpoint.
   * Manages loading state automatically during the request.
   *
   * @template T The expected type of the response data
   * @param endpointUrl The URL endpoint to send the DELETE request to
   * @returns An Observable of type T containing the response data
   */
  delete<T>(endPoint: string): Observable<T> {
    this._loaderService.start();
    return this._http.delete<T>(this.constructUrl({ endPoint }))
      .pipe(
        finalize(() => this._loaderService.stop())
      );
  }

  private constructUrl(obj: Record<string, string | number>): string {
    const queryParams = Object.entries(obj)
      .map(([key, value]) => `?${key}=${value}`)
      .join('&');
    return this.BASE_URL + queryParams;
  }

}
