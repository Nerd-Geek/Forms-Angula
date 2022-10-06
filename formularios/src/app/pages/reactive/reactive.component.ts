import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ValidadoresService } from 'src/app/services/validadores.service';

@Component({
  selector: 'app-reactive',
  templateUrl: './reactive.component.html',
  styleUrls: ['./reactive.component.css']
})
export class ReactiveComponent implements OnInit {

  forma: FormGroup = new FormGroup({
    nombre: new FormControl(''),
    apellido: new FormControl(''),
    correo: new FormControl('')
  });

  constructor(private fb:FormBuilder,
              private validador: ValidadoresService) {

    this.crearFormulario();
    this.cargarDataAlForm();
    this.crearListeners();
  }

  ngOnInit(): void {
  }

  get pasatiempos() {
    return this.forma.get('pasatiempos') as FormArray;
  }

  get nombreNoValido() {
    return this.forma.get('nombre')!.invalid && this.forma.get('nombre')!.touched
  }

  get apellidoNoValido() {
    return this.forma.get('apellido')!.invalid && this.forma.get('apellido')!.touched
  }

  get correoNoValido() {
    return this.forma.get('correo')!.invalid && this.forma.get('correo')!.touched
  }

  get usuarioNoValido() {
    return this.forma.get('usuario')!.invalid && this.forma.get('usuario')!.touched
  }

  get pass1NoValido() {
    return this.forma.get('pass1')!.invalid && this.forma.get('pass1')!.touched
  }

  get pass2NoValido() {
    const pass1 = this.forma.get('pass1')?.value;
    const pass2 = this.forma.get('pass2')?.value;

    return !( pass1 == pass2 )
  }

  get distritoNoValido() {
    return this.forma.get('direccion.distrito')!.invalid && this.forma.get('direccion.distrito')!.touched
  }

  get ciudadNoValido() {
    return this.forma.get('direccion.ciudad')!.invalid && this.forma.get('direccion.ciudad')!.touched
  }

  crearFormulario() {

    this.forma = this.fb.group({

      nombre: ['',[ Validators.required, Validators.minLength(5)]],
      apellido: ['',[ Validators.required, this.validador.noHerrera]],
      correo: ['',[ Validators.required,  Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$")]],
      usuario: ['', ,this.validador.existeUsuario],
      pass1: ['', [Validators.required, Validators.minLength(5)]],
      pass2: ['', [Validators.required, Validators.minLength(5)]],
      direccion: this.fb.group({
        distrito: ['', [ Validators.required, Validators.minLength(5)]],
        ciudad: ['', [ Validators.required, Validators.minLength(5)]],

      }),
      pasatiempos: this.fb.array([])
    },{
      validator: this.validador.passwordsIguales('pass1', 'pass2'),
    });
  }

  crearListeners() {
    this.forma.valueChanges.subscribe( valor => {
      console.log(valor);
    })

    this.forma.statusChanges.subscribe(status => {
      console.log(status);
    })
  }

  cargarDataAlForm() {

    this.forma.setValue({
      nombre: "Juana",
      apellido: "Martinez",
      correo: "juan@gmail.com",
      usuario: "manolo",
      pass1: [''],
      pass2: [''],
      direccion: {
        distrito: "Ontario",
        ciudad: "Ottawa"
      },
      pasatiempos: []
   });
  }

  agreagarPasatiempo() {
    this.pasatiempos.push( this.fb.control('',  Validators.required) )
  }

  borrarPasatiempo(index: number) {
    this.pasatiempos.removeAt(index);
  }

  guardar() {

    if ( this.forma.invalid ) {


      return Object.values(this.forma.controls).forEach( control => {
        control.markAllAsTouched();
      });
    }

    this.forma.reset({
      nombre: 'Sin nombre'
    });
  }
}
