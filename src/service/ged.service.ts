import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class GEDService {
    private serverName = '/ged-server';
    private urlProxy = 'http://localhost:9099';
    private urlGEDUploadFile = this.urlProxy + this.serverName + '/GED/Client/uploadFile';
    private urlGetDocument = this.urlProxy + this.serverName +'/GED/Client/getDocument'; 
    constructor(private http: HttpClient) { }

    uploadFile(fileInfo): Observable<string> {
        return this.http.post(this.urlGEDUploadFile,
            fileInfo,
            { responseType: 'text' });
    }
    getdocument(idDocuemnt) : Observable<string> {
        return this.http.get(this.urlGetDocument + "/" + idDocuemnt,
            { responseType: 'text' });
    }
}
