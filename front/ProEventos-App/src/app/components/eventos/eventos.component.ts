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


ngOnInit(): void {
    
}



}
