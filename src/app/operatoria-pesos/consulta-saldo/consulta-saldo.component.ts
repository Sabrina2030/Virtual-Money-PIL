import { Component } from '@angular/core';

@Component({
  selector: 'app-consulta-saldo',
  templateUrl: './consulta-saldo.component.html',
  styleUrls: ['./consulta-saldo.component.css']
})

export class ConsultaSaldoComponent {

  Mostrar:boolean = true;
  visible:boolean = false;

  onclick()
  {
    this.Mostrar = !this.Mostrar;
    this.visible = !this.visible
  }

}