import { Component, QueryList, ViewChildren } from '@angular/core';
import { FormControl } from '@angular/forms';

import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { AppService } from './app-service.component';
import { SortableHeader, SortEvent } from './sortableHeader';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {

  studentList: Student[];

  Id: Number;
  FirstName: string;
  LastName: string;
  Mobile: string;
  Email: string;
  Nic: string;
  Dob: string;
  Add: string;
  ProfilePic: string;

  // create new
  _firstName: string;
  _lastName: string;
  _mobile: string;
  _email: string;
  _nic: string;
  _dob: string;
  _add: string;
  _profilePic: string;

  public isCollapsed = true;

  closeResult: string;
  title = 'student-reg-frontend';
  filter = new FormControl('');

  @ViewChildren(SortableHeader) headers: QueryList<SortableHeader>;

  constructor(private modalService: NgbModal, public appService: AppService) {
  }

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
      this.Id = res.id;
      this.FirstName = res.firstName;
      this.LastName = res.lastName;
      this.Mobile = res.mobile;
      this.Email = res.email;
      this.Nic = res.nic;
      this.Dob = res.dob;
      this.Add = res.address;
    })
  }

  async submit() {
    let data = {
      "firstName": this._firstName,
      "lastName": this._lastName,
      "mobile": this._mobile,
      "email": this._email,
      "nic": this._nic,
      "dob": this._dob,
      "add": this._add,
      "profilePic": this._profilePic
    }
    this.appService.submitStudent(data).subscribe((res: any) => {
    })
  }

  search() {
  }

  update() {
    let data = {
      "id": this.Id,
      "firstName": this.FirstName,
      "lastName": this.LastName,
      "mobile": this.Mobile,
      "email": this.Email,
      "nic": this.Nic,
      "dob": this.Dob,
      "add": this.Add,
      "profilePic": this.ProfilePic
    }
    this.appService.updateStudent(this.Id, data).subscribe((res: any) => {
    })
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
    this.appService.deleteStudent(id).subscribe((res: any) => {
    })
    this.clear();
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
    // console.log("ppppp" , reason)
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  onSort({ column, direction }: SortEvent) {
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