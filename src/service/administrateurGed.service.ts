import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AdministrateurGEDService {
    private serverName = '/ged-server';
    private urlProxy = 'http://localhost:9099';
    private urlGEDLoginAdministrateur = this.urlProxy + this.serverName + '/AdministrateurGed/login';
    private urlGEDGetDocumentByYear = this.urlProxy + this.serverName + '/AdministrateurGed/getDocumentByYear';
    private urlGEDGetDocumentYears = this.urlProxy + this.serverName + '/AdministrateurGed/getDocumentYears';
    private urlGEDGetDocumentMonths = this.urlProxy + this.serverName + '/AdministrateurGed/getDocumentMonths';
    constructor(private http: HttpClient) { }

    login(fileInfo): Observable<string> {
        return this.http.post(this.urlGEDLoginAdministrateur,
            fileInfo,
            { responseType: 'text' });
    }
    getDocumentInfoByYear(sorted): Observable<string> {
        return this.http.get(this.urlGEDGetDocumentByYear + "/" + sorted ,
            { responseType: 'text' });
    }
    getDocumentYears(sorted): Observable<string> {
        return this.http.get(this.urlGEDGetDocumentYears + "/" + sorted,
            { responseType: 'text' });
    }
    getDocumentMonths(year,sorted): Observable<string> {
        return this.http.get(this.urlGEDGetDocumentMonths + "/" + sorted + "/" + year,
            { responseType: 'text' });
    }
}
