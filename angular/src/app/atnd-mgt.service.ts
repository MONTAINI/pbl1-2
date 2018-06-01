import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';

import { Times, User, MgtInfo } from './atnd';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': 'my-auth-token'
  })
};

@Injectable()
export class AtndMgtService {

  constructor(private http: HttpClient) { }

  // 一日分の全生徒のデータ
  getAtndsAllStudents(year: number, month: number): Observable<MgtInfo> {
    return this.http.get<MgtInfo>(`//localhost:3000/month/${year}/${month}`)
      .pipe(tap(mgtInfo => console.log(mgtInfo)), catchError(this.handleError('getAtndsAllStudents', new MgtInfo()))
      );
  }

  // 一生徒の一ヶ月分のデータ
  getAtndsOneMonth(year: number, month: number, num: number): Observable<User> {
    return this.http.get<User>(`//localhost:3000/month/${year}/${month}/student/${num}`)
      .pipe(tap(user => console.log(user)), catchError(this.handleError('getAtndsOneMonth', new User()))
      );
  }

  // 出席状況の更新
  putAtnd(userId: number, date: string, state: {[key: string]: number}): Observable<Times> {
    return this.http.put<Times>(`//localhost:3000/attendances/${userId}/${date}`, JSON.stringify(state), httpOptions)
      .pipe(tap(res => console.log(res)), catchError(this.handleError('putAtnd', new Times()))
    );
  }
   /**
   * 失敗したHttp操作を処理します。
   * アプリを持続させます。
   * @param operation - 失敗した操作の名前
   * @param result - observableな結果として返す任意の値
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.log(operation);
      console.error(error);
      // 空の結果を返して、アプリを持続可能にする
      return of(result as T);
    };
  }
}
