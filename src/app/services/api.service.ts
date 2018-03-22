import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {HttpClient} from '@angular/common/http';
import {catchError, tap} from 'rxjs/operators';
import {of} from 'rxjs/observable/of';

@Injectable()
export class ApiService {
    private dbName = 'angulartest';
    private collection = 'users';
    private apiKey = 'kxxuMEnxQaQ9aySD5u0zcYNN-ksbqt5m';
    public url = 'https://api.mlab.com/api/1';

    constructor(private http: HttpClient) {
    }

    public post(data: any): Observable<any> {
        return this.http.post(this.getUrlByQueryType('POST'), data)
            .pipe(
                tap(heroes => console.log('fetched "' + this.url + '"')),
                catchError(this.handleError(this.url, []))
            );
    }

    public put(data: any): Observable<any> {
        return this.http.put(this.getUrlByQueryType('PUT', data._id.$oid), data)
            .pipe(
                tap(heroes => console.log('fetched "' + this.url + '"')),
                catchError(this.handleError(this.url, []))
            );
    }

    public get(): Observable<any> {
        return this.http.get(this.getUrlByQueryType('GET'))
            .pipe(
                tap(heroes => console.log('fetched "' + this.url + '"')),
                catchError(this.handleError(this.url, []))
            );
    }

    public delete(_id: any): Observable<any> {
        return this.http.delete(this.getUrlByQueryType('DELETE', _id.$oid))
            .pipe(
                tap(heroes => console.log('fetched "' + this.url + '"')),
                catchError(this.handleError(this.url, []))
            );
    }

    /**
     * Handle Http operation that failed.
     * Let the app continue.
     * @param operation - name of the operation that failed
     * @param result - optional value to return as the observable result
     */
    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {

            console.error(error); // log to console instead

            console.error(`${operation} failed: ${error.message}`);

            // Let the app keep running by returning an empty result.
            return of(result as T);
        };
    }

    private getUrlByQueryType(type: string, data?: any) {
        const {url, apiKey, dbName, collection} = this;

        switch (type) {
            case 'GET': {
                return `${url}/databases/${dbName}/collections/${collection}?q={}&apiKey=${apiKey}`;
            }

            case 'POST': {
                return `${url}/databases/${dbName}/collections/${collection}?apiKey=${apiKey}`;
            }

            case 'PUT': {
                return `${url}/databases/${dbName}/collections/${collection}/${data}?apiKey=${apiKey}`;
            }

            case 'DELETE': {
                return `${url}/databases/${dbName}/collections/${collection}/${data}?apiKey=${apiKey}`;
            }

            default: {
                return `${url}/databases/${dbName}/collections/${collection}?apiKey=${apiKey}`;
            }
        }
    }
}
