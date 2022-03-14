import {TableOperations} from './table-operations';
import {Observable, of} from 'rxjs';

class SomeTable extends TableOperations<any> {
  protected fetchCollection(params: { limit: number; page: number; search: string }): Observable<{ total: number; dataList: any[] }> {
    return of({total: 1, dataList: [{id: 190, name: 'some item'}]});
  }
}

describe('TableOperations', () => {
  it('should set resultsLength on fetchData()', () => {
    const table: TableOperations<any> = new SomeTable();
    table.ngOnInit();

    expect(table.resultsLength).toBe(1);
  });
});
