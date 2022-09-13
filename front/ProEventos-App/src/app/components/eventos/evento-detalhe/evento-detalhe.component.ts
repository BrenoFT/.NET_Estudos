import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Evento } from '@app/models/Evento';

import { EventoService } from '@app/services/evento.service';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-evento-detalhe',
  templateUrl: './evento-detalhe.component.html',
  styleUrls: ['./evento-detalhe.component.scss']
})
export class EventoDetalheComponent implements OnInit {

  evento = {} as Evento;
  form: FormGroup;
  modalRef: BsModalRef;
  eventoId: number;
  estadoSalvar = 'post';
  loteAtual = { id: 0, nome: '', indice: 0 };
  imageURL = 'assets/img/upload.png';
  file: File;


  get f(): any {
    return this.form.controls;
  }

  get bsConfig(): any{
    return {
      adaptivePosition: true,
      isAnimated: true,
      dateInputFormat: 'DD/MM/YYYY hh:mm a',
      containerClass: 'theme-default',
      showWeekNumbers: false
    }
  }

  constructor(private fb: FormBuilder,
                      private localeService: BsLocaleService,
                      private router: ActivatedRoute,
                      private eventoService: EventoService,
                      private spinner: NgxSpinnerService,
                      private toestr: ToastrService)
  {
    this.localeService.use('pt-br');
  }

  public carregarEvento(): void {
    const eventoIdParam =  this.router.snapshot.paramMap.get('id');

    if (eventoIdParam != null) {
      this.spinner.show();
      this.estadoSalvar = 'put'
      this.eventoService.getEventoById(+eventoIdParam).subscribe(
          (evento: Evento) => {
            this.evento = {... evento};
            this.form.patchValue(this.evento);
          },
          (error: any) => {
            this.spinner.hide();
            this.toestr.error('Erro ao tentar carregar Evento', 'Erro!')
            console.error(error);
          },
          () => this.spinner.hide(),
        );
    }
  }


  ngOnInit(): void {
    this.validation();
    this.carregarEvento();
  }

  public validation(): void {
    this.form = this.fb.group({
      tema: ['',
      [Validators.required, Validators.minLength(4), Validators.maxLength(50)]],
      local: ['', Validators.required],
      dataEvento: ['', Validators.required],
      qtdPessoas: ['', [Validators.required, Validators.maxLength(120000)]],
      telefone: ['', [Validators.required, Validators.minLength(11), Validators.maxLength(11)]],
      email: ['', [Validators.required, Validators.email]],
      imageURL: ['', Validators.required],
    });
  }

  public resetForm(): void{
    this.form.reset();
  }

  public salvarAlteracao(): void {

    this.spinner.show();
    if (this.form.valid) {
      this.evento = (this.estadoSalvar === 'post')
                        ?    {... this.form.value}
                        :    {id: this.evento.id, ... this.form.value};

      this.eventoService[this.estadoSalvar](this.evento).subscribe(
        () => this.toestr.success('Evento salvo com sucesso!', 'Sucesso'),
        (error: any) => {
          console.error(error);
          this.spinner.hide();
          this.toestr.error('Error ao salvar evento', 'Erro');
        },
        () => this.spinner.hide(),
      );
    }
  }
}
