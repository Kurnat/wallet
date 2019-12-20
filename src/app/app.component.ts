import { Component } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap';
import { FormGroup, FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  modalRef: BsModalRef;
  outlay: boolean = false;
  date: boolean = false;
  sum: boolean = false;
  tamep
 
  operation = 'Income';
  constructor( ) {}
  form: FormGroup

  ngOnInit() {
    this.form = new FormGroup({
      outlay: new FormControl('', Validators.required),
      date: new FormControl('', Validators.required),
      operation: new FormControl('Income'),
      sum: new FormControl('', Validators.required),
    })
  }

  radioChanges(event){
    event.target.value === 'exes' ? this.operation = 'Exes' : this.operation = 'Income';
  }

  submit() {
    const  formData = { ...this.form.value }
    this.form.get('outlay').invalid ? this.outlay = true : this.outlay = false;
    this.form.get('date').invalid ? this.date = true : this.date = false;
    this.form.get('sum').invalid ? this.sum = true : this.sum = false;
    
    if (this.form.get('outlay').valid && this.form.get('date').valid && this.form.get('sum').valid) {
      this.modalRef.hide()
    } 
  }

}
