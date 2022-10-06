import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PaisService } from 'src/app/services/pais.service';
import { Country } from 'src/app/types/api';
import { Observable } from 'rxjs'

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.css']
})
export class TemplateComponent implements OnInit {

  countries$: any;


  usuario = {
    nombre: 'Fernando',
    apellido: 'Herrera',
    correo: 'fernando@gmail.com',
    pais: 'ESP'
  }

  constructor(private paisService: PaisService) { }

  ngOnInit(): void {
    this.countries$ = this.paisService.getPaises();
  }

  guardar( forma: NgForm ) {

    if ( forma.invalid ) {

      Object.values(forma.controls).forEach( control => {
        control.markAllAsTouched();
      });
      return;

    }


    console.log(forma.value)
  }
}
