import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TodoDataService } from 'src/app/core/services/todo-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-modal-confirm',
  templateUrl: './modal-confirm.component.html',
  styleUrls: ['./modal-confirm.component.scss']
})

export class ModalConfirmComponent implements OnInit {

  date: boolean = false;
  sum: boolean = false;
  form: FormGroup;
  operation: boolean = true;
  post:any;
  maxDate = new Date()

  constructor(
    private modalService: BsModalService,
    private modalRef: BsModalRef,
    private todoDataService: TodoDataService,
    private router: Router
  ) { 
    this.maxDate.setDate(this.maxDate.getDate());
  }

  clickButtonModal(): void { }

  hide(): void {
    this.modalRef.hide()
    this.todoDataService.date = this.todoDataService.sum = this.todoDataService.title = false;
  }

  ngOnInit() {
    if(this.post){
    this.form = new FormGroup({
      title: new FormControl(this.post.title, Validators.required),
      date: new FormControl(new Date(this.post.date), Validators.required),
      putOrTakeManey: new FormControl(this.post.putOrTakeManey),
      sum: new FormControl(this.post.sum, [
        Validators.required,
        this.todoDataService.numeric
      ]),
    });
    this.post.putOrTakeManey === 'put' ?  this.operation = true : this.operation = false;
    }else{
      this.form = new FormGroup({
        title: new FormControl('', Validators.required),
        date: new FormControl(new Date(), Validators.required),
        putOrTakeManey: new FormControl('put'),
        sum: new FormControl('', [
          Validators.required,
          this.todoDataService.numeric
        ]),
      })
    }
  }

  radioChanges(event) {
    event.target.value === 'put' ?  this.operation = true : this.operation = false, event.target.value = 'take';
  }

  submit(form) {   
    this.form.get('date').invalid ? this.date = true : this.date = false;
    this.form.get('sum').invalid ? this.sum = true : this.sum = false;
    if (this.form.get('outlay').valid && this.form.get('date').valid && this.form.get('sum').valid) {
      this.modalRef.hide();
    } 
  }

}
