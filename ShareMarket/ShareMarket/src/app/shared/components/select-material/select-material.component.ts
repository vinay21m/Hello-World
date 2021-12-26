import { map, Observable, of, startWith } from 'rxjs';

import { AfterViewInit, Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

@Component({
  selector: 'app-select-material',
  templateUrl: './select-material.component.html',
  styleUrls: ['./select-material.component.scss']
})
export class SelectMaterialComponent implements AfterViewInit {
  typeahead: FormControl = new FormControl();
  @Input() title: string = '';
  @Input() placeholder: string = 'Select';
  @Input() searchValue: any = '';
  @Input() suggestions!: Array<any>;
  @Input() loading: number = 0;
  @Input() isDisable: boolean = false;
  @Input() requried: boolean = false;
  isRequried: boolean = false;
  @Output() search: EventEmitter<any> = new EventEmitter<any>();
  filteredOptions!: Observable<any[]>;

  constructor() { }

  ngAfterViewInit(): void {
    Promise.resolve(null).then(() => {
      this.filteredOptions = this.typeahead.valueChanges.pipe(
        startWith(''),
        map(name => (name ? this.filter(name) : this.suggestions.slice())),
      );
    });
  }

  setValue(value: MatAutocompleteSelectedEvent) {
    this.searchValue = value.option.value.name;
    this.search.emit(value.option.value);
  }

  setRequried(event: Event) {
    let inputValue = (event.target as HTMLInputElement).value;
    this.searchValue = inputValue;
    this.isRequried = this.requried ? (!!!inputValue) : false;
    this.searchData(event);
  }

  filter(name: any): any[] {
    const filterValue = name.toLowerCase();
    return this.suggestions.filter((option: any) => option.name.toLowerCase().includes(filterValue));
  }

  searchData(event: Event) {
    let value = (event.target as HTMLInputElement).value;
    this.filteredOptions = of(this.filter(value));

    if (!!!value)
    this.search.emit({name: '', value: ''});
  }
}
