import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from "rxjs";

const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'my-auth-token'
    })
};

@Injectable()
export class AppService {
    constructor(protected httpClient: HttpClient) { }

    getStudents(): Observable<any> {
        return this.httpClient.get<any>('http://localhost:5043/api/Students');
    }

    submitStudent(studentOject: object): Observable<any> {
        const headers = new HttpHeaders({ 'content-type': 'application/json; charset=utf-8 Access-Control-Allow-Methods: POST' })
        return this.httpClient.post<any>('http://localhost:5043/api/Students', studentOject, { headers: headers });
    }

    getStudent(id: any): Observable<any> {
        return this.httpClient.get<any>('http://localhost:5043/api/Students/' + id)
    }

    deleteStudent(id: any): Observable<any> {
        return this.httpClient.delete<any>('http://localhost:5043/api/Students/' + id)
    }

    updateStudent(id: any, studentOject: object): Observable<any> {
        const headers = new HttpHeaders({ 'content-type': 'application/json' })
        return this.httpClient.put<any>('http://localhost:5043/api/Students/' + id, studentOject, { headers: headers })
    }
}