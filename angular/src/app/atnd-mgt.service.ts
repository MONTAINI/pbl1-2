import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';

import { User, MgtInfo } from './atnd';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class AtndMgtService {

  constructor(private http: HttpClient) { }

  // 一日分の全生徒のデータ
  getAtndsAllStudents(year: number, month: number, offset: number): Observable<MgtInfo> {
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

  // 名前取得
  /*
  getName(num: number): Observable<string> {
    return this.http.get<string>(`//localhost:3000/student/${num}`)
      .pipe(tap(name => console.log(name)), catchError(this.handleError('getName', ''))
    );
  }
  */
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
