import {MatTableDataSource} from '@angular/material/table';
import {Observable, Subscription} from 'rxjs';
import {Component, OnDestroy, OnInit} from '@angular/core';

@Component({
  template: '',
  styles: [],
})
export abstract class TableOperations<T> implements OnInit, OnDestroy{
  displayedColumns: string[] = [];
  dataSource: MatTableDataSource<T> = new MatTableDataSource<T>();

  resultsLength = 0;
  pageSize = 10;
  currentPage = 0;
  searchQuery = '';
  dataSubscription?: Subscription;
  isLoadingResults = false;

  ngOnInit(){
    this.fetchData();
  }

  ngOnDestroy() {
    if (this.dataSubscription) {
      this.dataSubscription.unsubscribe();
    }
  }

  protected abstract fetchCollection(params: {
    limit: number,
    page: number,
    search: string
  }): Observable<{ total: number, dataList: T[] }>;

  protected fetchData() {
    if (this.dataSubscription) {
      this.dataSubscription.unsubscribe();
    }
    this.dataSubscription = this.fetchCollection({
      limit: this.pageSize,
      page: this.currentPage + 1,
      search: this.searchQuery
    }).subscribe(({total, dataList}) => {
      this.dataSource.data = dataList;
      this.resultsLength = total;
      this.afterApplyingData();
    });
  }

  protected afterApplyingData() {
    this.isLoadingResults = false;
  }


}
