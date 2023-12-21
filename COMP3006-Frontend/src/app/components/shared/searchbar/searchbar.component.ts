import { CommonModule } from '@angular/common';
import { Component, Input, Output } from '@angular/core';
import { FormControl, FormsModule, NgModel } from '@angular/forms';
import { NgbTypeahead, NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';
import { Observable, OperatorFunction, debounceTime, distinctUntilChanged, map } from 'rxjs';

@Component({
  selector: 'app-searchbar',
  standalone: true,
  imports: [NgbTypeahead, FormsModule],
  templateUrl: './searchbar.component.html',
  styleUrl: './searchbar.component.scss'
})
export class SearchbarComponent {

  @Input() searchTerms: Array<string> = [];
  @Output() model: string = '';

  search: OperatorFunction<string, readonly string[]> = (text$: Observable<string>) =>
		text$.pipe(
			debounceTime(200),
			distinctUntilChanged(),
			map((term) =>
				term.length < 2 ? [] : this.searchTerms.filter((item) => item.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10),
			),
		);
}
