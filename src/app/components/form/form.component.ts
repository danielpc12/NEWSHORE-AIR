import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms'

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit{

  flightsForm = new FormGroup({
    origin: new FormControl('', Validators.required),
    destination: new FormControl('', Validators.required)
  })
  constructor(){}

  ngOnInit(): void {
      
  }

  onSearch(form: any){
    console.log(form)
  }

  
}
