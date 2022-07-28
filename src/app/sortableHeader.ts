import { Directive, EventEmitter, Input, Output } from '@angular/core';
import { Student } from './studentList';

export type SortColumn = keyof Student | '';
export type SortDirection = 'asc' | 'desc' | '';

const rotate: { [key: string]: SortDirection } = { 'asc': 'desc', 'desc': '', '': 'asc' };

// const compare = (v1: string | number, v2: string | number) => v1 < v2 ? -1 : v1 > v2 ? 1 : 0;

@Directive({
    selector: 'th[sortable]',
    host: {
        '[class.asc]': 'direction === "asc"',
        '[class.desc]': 'direction === "desc"',
        '(click)': 'rotate()'
    }
})

export class SortableHeader {
    @Input() sortable: SortColumn = '';
    @Input() direction: SortDirection = '';
    @Output() sort = new EventEmitter<SortEvent>();

    rotate() {
        this.direction = rotate[this.direction];
        this.sort.emit({ column: this.sortable, direction: this.direction });
    }
}

export interface SortEvent {
    column: SortColumn;
    direction: SortDirection;
}
