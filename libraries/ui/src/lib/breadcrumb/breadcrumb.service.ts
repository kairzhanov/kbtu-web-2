import { Injectable } from '@angular/core';
import {
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  Router,
  RoutesRecognized,
} from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { filter } from 'rxjs/operators';
import { BreadcrumbItem } from './breadcrumb/breadcrumb.component';

@Injectable({
  providedIn: 'root',
})
export class BreadcrumbService {
  private _items = new BehaviorSubject<BreadcrumbItem[]>([]);
  private _title = new BehaviorSubject<string>('');

  private _sourceArr: BreadcrumbItem[] = [];
  private _clearData = false;

  constructor(private _router: Router) {
    let title: string;

    this._router.events
      .pipe(filter((event) => event instanceof RoutesRecognized))
      .subscribe((e) => {
        console.log(e);
        if (e instanceof RoutesRecognized) {
          let route = e.state.root;

          while (route.data !== null) {
            if (
              route.data.id !== null &&
              !this._sourceArr.find((item) => item.Id === route.data.url)
            ) {
              this._sourceArr.push(
                new BreadcrumbItem({
                  Id: route.data.url,
                  Name: route.data.breadCrumbTitle,
                })
              );
              title = route.data.title;
              console.log(route, route.data);
            }
            if (route.firstChild) {
              route = route.firstChild;
            } else {
              break;
            }
          }
        }
      });

    this._router.events
      .pipe(
        filter(
          (event) =>
            event instanceof NavigationEnd ||
            event instanceof NavigationCancel ||
            event instanceof NavigationError
        )
      )
      .subscribe((e) => {
        if (e instanceof NavigationEnd) {
          if (!this._clearData) {
            this._items.next(this._sourceArr);
            this.setTitle(title);
          }
          this._sourceArr = [];
          this._clearData = false;
          title = '';
        }
      });
  }

  getItems() {
    return this._items.asObservable();
  }

  getTitle() {
    return this._title.asObservable();
  }

  setTitle(title: string) {
    this._title.next(title);
  }

  setItems(items: BreadcrumbItem[]) {
    this._items.next(items);
  }

  clearItems() {
    this._items.next([]);
  }

  clearData() {
    this.clearItems();
    this._title.next('');
  }
}
