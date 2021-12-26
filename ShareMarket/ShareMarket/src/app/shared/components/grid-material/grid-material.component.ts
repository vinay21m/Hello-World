//import { TableButtonAction } from '@shared/models/tableButtonAction';
import { TableColumn } from 'src/app/shared';

import { SelectionModel } from '@angular/cdk/collections';
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-grid-material',
  templateUrl: './grid-material.component.html',
  styleUrls: ['./grid-material.component.scss']
})
export class GridMaterialComponent  implements OnInit {

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @Output() remove: EventEmitter<any> = new EventEmitter<any>();
  @Output() cellClick: EventEmitter<any> = new EventEmitter<any>();
  @Output() isLinked: EventEmitter<any> = new EventEmitter<any>();
  //@Output() action: EventEmitter<TableButtonAction> = new EventEmitter<TableButtonAction>()
  @Input() columns!: Array<TableColumn>;
  @Input() dataset: Array<any> = [];  
  @Input() isLinkingRequired: boolean = false;
  @Input() linkActionHeaderLable : string ='';
  @Input() isAction: boolean = false;
  @Input() isCaseEdit: boolean = false;
  @Input() isSelectedByCheckBox: boolean = false;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  dataSource!: MatTableDataSource<any>;
  selection = new SelectionModel<any>(true, []);
  displayedColumns: string[] = [];
  value: any;
  constructor() { }

  refreshGrid(data?: any) {
    Promise.resolve(null).then(() => { 
    this.dataSource = new MatTableDataSource<any>(data ?? this.dataset);
    // set pagination
    this.dataSource.paginator = this.paginator;
    
    this.dataSource.sort = this.sort;
    });
  }

  ngOnInit() {
    // set checkbox column
    if (this.isSelectedByCheckBox)
    this.displayedColumns.push("select");

    // set table columns
    this.displayedColumns = this.displayedColumns.concat(this.columns.map(x => x.columnDef));    // pre-fix static

    // add action column
    if (this.isAction)
    this.displayedColumns.push("action");
    if (this.isLinkingRequired)
    this.displayedColumns.push('linkingRequired');
    this.refreshGrid();
  }

  // onTableAction(e: TableButtonAction): void {
  //   this.action.emit(e)
  // }
  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }

  ngAfterViewInit() {
    if (!!this.sort && !!this.dataSource)
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.value = filterValue;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  clearFilter() {
    this.value = '';
    this.dataSource.filter = this.value.trim().toLowerCase();
  }

  removeRow(item: any) {
    this.remove.emit(item);
  }

  public cellClickHandler(data: any) {
    this.cellClick.emit(data);
  }

  isLinkedChecked(caseInfo: any, toggleValue: any) {
    let objectItems: any[] = [];
    caseInfo.isSelected = toggleValue.target.checked;
    objectItems.push(caseInfo.caseID);
    objectItems.push(toggleValue.target.checked);
    console.log(objectItems);    
    this.isLinked.emit(objectItems);
  }
}