import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'hc-desc',
  templateUrl: './desc.component.html',
  styleUrls: ['./desc.component.scss'],
})
export class DescComponent implements OnInit {
  email = new FormControl('', [
    Validators.required,
    Validators.email,
    Validators.minLength(6),
  ]);

  password = new FormControl('', [Validators.required]);

  constructor() {}

  ngOnInit(): void {}
}
