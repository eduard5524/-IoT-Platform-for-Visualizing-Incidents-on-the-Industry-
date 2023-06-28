import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataSharingService {

    private messageOptionSelected: BehaviorSubject<number> = new BehaviorSubject(1);

    constructor() { }

    menuOptionSelectedObservable(): Observable<number> {
        return this.messageOptionSelected.asObservable();
    }

    changeMenuOptionSelected(option: number) {
        this.messageOptionSelected.next(option);
    }
}
