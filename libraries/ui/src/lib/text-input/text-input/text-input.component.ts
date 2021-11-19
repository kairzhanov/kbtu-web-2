import { Component, Input, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'ui-text-input',
  templateUrl: './text-input.component.html',
  styleUrls: ['./text-input.component.scss'],
})
export class TextInputComponent implements OnInit {
  @Input() type: 'text' | 'password' | 'email' = 'text';

  @Input() label: string = '';

  @Input() control = new FormControl('', [Validators.required]);

  constructor() {}

  ngOnInit(): void {}
}
