import { Template } from '@angular/compiler/src/render3/r3_ast';
import { NgxSpinnerService } from 'ngx-spinner';
import { Component, TemplateRef, OnInit } from '@angular/core';
import { BsModalService, BsModalRef, ModalOptions } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';

import { Evento } from '../../models/Evento';
import { EventoService } from '../../services/evento.service';


@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.scss'],
})
export class EventosComponent implements OnInit {

  modalRef!: BsModalRef;

  public eventos: Evento[] = [];
  public eventosFiltrados: Evento[] = [];
  public widthImg = 150;
  public marginImg = 2;
  public exibirImagem = true;
  private filtroListado = '';

  public get filtroLista(): string {
    return this.filtroListado;
  }

  public set filtroLista(value: string) {
    this.filtroListado = value;
    this.eventosFiltrados = this.filtroLista ? this.filtrarEventos(this.filtroLista) : this.eventos
  }

  public filtrarEventos(filtrarPor: string): Evento[] {
    filtrarPor = filtrarPor.toLocaleLowerCase();
    return this.eventos.filter(
      (      evento: { tema: string; local: string; }) => evento.tema.toLocaleLowerCase().indexOf(filtrarPor) !== -1 ||
      evento.local.toLocaleLowerCase().indexOf(filtrarPor) != -1
    );
  }

  constructor(
    private eventoService: EventoService,
    private modalService: BsModalService,
    private toastrService: ToastrService,
    private spinner: NgxSpinnerService
    ) { }


  public ngOnInit(): void {
    this.getEventos();
    this.spinner.show();

    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.spinner.hide();
    }, 300);

  }

  public alterarImg(): void{
    this.exibirImagem = !this.exibirImagem;
  }

  public getEventos(): void{
    this.eventoService.getEventos().subscribe(
      (eventoResp: Evento[]) => {
        this.eventos = eventoResp;
        this.eventosFiltrados = this.eventos;
      },
      error => console.log(error)
    );
  }

  openModal(template: TemplateRef<any>): void {
    this.modalRef = this.modalService.show(template);
  }

  confirm(): void {
    this.modalRef.hide();
    this.toastrService.success('O Evento foi deletado com Sucesso', 'Deletado!');
  }

  decline(): void {
    this.modalRef.hide();
  }




}
