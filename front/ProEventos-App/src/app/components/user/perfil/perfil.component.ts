import { Component, OnInit } from '@angular/core';
import { AbstractControlOptions, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit {

  form: FormGroup;

  get f(): any{
    return this.form.controls;
  }

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void{
    this.validation();
  }

  private validation(): any {

    this.form = this.fb.group({
      primeiroNome: ['',[Validators.required ,Validators.minLength(3), Validators.maxLength(15)]],
      ultimoNome: ['',[Validators.required ,Validators.minLength(3), Validators.maxLength(15)]],
      email: ['',[Validators.required ,Validators.email]],
      telefone: ['',[Validators.required ,Validators.minLength(11), Validators.maxLength(11)]],
      titulo: ['',[Validators.required]],
      funcao: ['',[Validators.required, Validators.maxLength(120)]],
      descricao: ['',[Validators.required, Validators.maxLength(5000)]],
      senha: ['', [Validators.required, Validators.minLength(5)]],
      confirmarSenha: ['', [Validators.required]]
    });
  }

}
