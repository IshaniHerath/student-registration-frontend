import { Component, Directive, EventEmitter, Input, Output, QueryList, ViewChildren } from '@angular/core';
import { FormControl } from '@angular/forms';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { AppService } from './app-service.component';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
// import { NgbdSortableHeader } from './sortableHeader';

const rotate: { [key: string]: SortDirection } = { 'asc': 'desc', 'desc': '', '': 'asc' };
export type SortColumn = keyof Student | '';
export type SortDirection = 'asc' | 'desc' | '';
const compare = (v1: string | number, v2: string | number) => v1.toString().toLowerCase() < v2.toString().toLowerCase() ? -1 : v1.toString().toLowerCase() > v2.toString().toLowerCase() ? 1 : 0;

export interface SortEvent {
  column: SortColumn;
  direction: SortDirection;
}

@Directive({
  selector: 'th[sortable]',
  host: {
    '[class.asc]': 'direction === "asc"',
    '[class.desc]': 'direction === "desc"',
    '(click)': 'rotate()'
  }
})


export class NgbdSortableHeader {
  @Input() sortable: SortColumn = '';
  @Input() direction: SortDirection = '';
  @Output() sort = new EventEmitter<SortEvent>();

  rotate() {
    this.direction = rotate[this.direction];
    this.sort.emit({ column: this.sortable, direction: this.direction });
  }
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {

  @ViewChildren(NgbdSortableHeader) headers: QueryList<NgbdSortableHeader>;

  pageSize = 5;
  page = 1;

  searchText: any;

  studentList: Student[];

  Id: Number;
  FirstName: string;
  LastName: string;
  Mobile: string;
  Email: string;
  Nic: string;
  Dob: any;
  Add: string;
  ProfilePic: string;

  // create new
  _firstName: string;
  _lastName: string;
  _mobile: string;
  _email: string;
  _nic: string;
  _dob: any;
  _add: string;
  _profilePic: string;

  public isCollapsed = true;

  closeResult: string;
  title = 'student-reg-frontend';
  filter = new FormControl('');

  constructor(private modalService: NgbModal, public appService: AppService) { }

  model: NgbDateStruct;

  ngOnInit() {
    this.loadGrid();
  }

  loadGrid() {
    this.appService.getStudents().subscribe((res: any) => {
      this.studentList = res;
    })
  }

  getStudent(id: any) {
    this.appService.getStudent(id).subscribe((res: any) => {
      let date = {
        "year": moment(res.dob).year(),
        "month": moment(res.dob).month(),
        "day": moment(res.dob).day()
      }
      this.Id = res.id;
      this.FirstName = res.firstName;
      this.LastName = res.lastName;
      this.Mobile = res.mobile;
      this.Email = res.email;
      this.Nic = res.nic;
      this.Dob = date;
      this.Add = res.address;
      this.ProfilePic = res.profilePic;
    })
  }

  async submit() {
    let formattedDate = moment(this._dob.year + "-" + this._dob.month + "-" + this._dob.day).format();
    let data = {
      "firstName": this._firstName,
      "lastName": this._lastName,
      "mobile": this._mobile,
      "email": this._email,
      "nic": this._nic,
      "dob": formattedDate,
      "address": this._add,
      "profilePic": this._profilePic
    }
    this.appService.submitStudent(data).subscribe((res: any) => {
    })
    window.location.reload();
  }

  update() {
    let formattedDate = moment(this.Dob.year + "-" + this.Dob.month + "-" + this.Dob.day).format();
    let data = {
      "id": this.Id,
      "firstName": this.FirstName,
      "lastName": this.LastName,
      "mobile": this.Mobile,
      "email": this.Email,
      "nic": this.Nic,
      "dob": formattedDate,
      "address": this.Add,
      "profilePic": this.ProfilePic
    }
    this.appService.updateStudent(this.Id, data).subscribe((res: any) => {
    })
    window.location.reload();
  }

  clear(status?: string) {
    if (status == "popup") {
      this._firstName = "",
        this._lastName = "",
        this._mobile = "",
        this._email = "",
        this._nic = "",
        this._dob = "",
        this._add = "",
        this._profilePic = ""
    } else {
      this.FirstName = "";
      this.LastName = "";
      this.Mobile = "";
      this.Email = "";
      this.Nic = "";
      this.Dob = "";
      this.Add = "";
    }
  }

  delete(id: any) {
    this.appService.deleteStudent(id).subscribe((res: any) => { })
    this.clear();
    window.location.reload();
  }

  // Create Popup
  open(content: any) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then((result) => {
        this.closeResult = `Closed with: ${result}`;
      }, (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      });
  }
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  selectImg(event: any) {
    let imageName = event.target.value.split("\\");
    this._profilePic = imageName.pop();
  }

  onSort({ column, direction }: SortEvent) {
    // resetting other headers
    this.headers.forEach(header => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });

    // sorting countries
    if (direction === '' || column === '') {
      this.studentList = this.studentList;
    } else {
      this.studentList = [...this.studentList].sort((a, b) => {
        const res = compare(a[column], b[column]);
        return direction === 'asc' ? res : -res;
      });
    }
  }
}

export interface Student {
  id: number;
  firstName: string;
  lastName: string;
  mobile: number;
  email: string;
  nic: string;
  add: string;
  dob: string;
  profilePic: string;
}

