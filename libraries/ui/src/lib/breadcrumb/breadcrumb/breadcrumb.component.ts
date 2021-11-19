import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil, distinctUntilChanged } from 'rxjs/operators';
import { BreadcrumbService } from '../breadcrumb.service';

export class BreadCrumbsConfig {
  withMargin!: boolean;
  withTitle!: boolean;
  navigateOnClick!: boolean;

  constructor(config: BreadCrumbsConfig) {
    Object.assign(this, config);
  }
}

export class BreadcrumbItem {
  Id?: string;
  Name?: string;
  activeId?: string;

  constructor(breadcrumb: BreadcrumbItem) {
    Object.assign(this, breadcrumb);
  }
}

@Component({
  selector: 'ui-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss'],
})
export class BreadcrumbComponent implements OnInit, OnDestroy {
  @Input() items: BreadcrumbItem[] = [];
  @Input() config: BreadCrumbsConfig = new BreadCrumbsConfig({
    withMargin: true,
    navigateOnClick: true,
    withTitle: false,
  });

  srcItems: BreadcrumbItem[] = [];

  title = '';

  destroyed = new Subject<boolean>();

  constructor(
    private breadCrumbService: BreadcrumbService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const original = [...this.items];
    this.breadCrumbService
      .getItems()
      .pipe(takeUntil(this.destroyed))
      .subscribe((data) => {
        console.log(data);
        data = data ? data : [];
        this.items = [...data, ...original];
      });

    this.breadCrumbService
      .getTitle()
      .pipe(takeUntil(this.destroyed), distinctUntilChanged())
      .subscribe((title) => {
        this.title = title;
      });
  }

  itemClick(index: number) {
    if (index !== this.items.length - 1) {
      if (this.config.navigateOnClick) {
        this.router.navigate([this.items[index].Id]);
      }
    }
  }

  ngOnDestroy(): void {
    this.destroyed.next(true);
  }
}
