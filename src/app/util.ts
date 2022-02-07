'use strict';
import {HttpHeaders} from '@angular/common/http';

export const ruta: string='/gym';
export const usuario: string='/usuario';
export const sesion: string='/sesion';
export const ejercicio: string='/ejercicio';
export const parametro: string='/parametro';
export const plantillaplan: string='/plantillaplan';
export const tipomusculo: string='/tipomusculo';
export const rutina: string='/rutina';
export const buscar: string='/buscar';
export const consultarPorTipoMusculo: string='/consultarPorTipoMusculo';
export const consultarPorTipo: string='/consultarPorTipo';
export const consultarPorTituloTipo: string='/consultarPorTituloTipo';
export const consultarPorDescripcion: string='/consultarPorDescripcion';
export const consultarClientesPorNombreIdentificacion: string='/consultarClientesPorNombreIdentificacion';
export const consultarClientes: string='/consultarClientes';
export const consultarAdmins: string='/consultarAdmins';
export const crearCliente: string='/crearCliente';
export const crearAdmin: string='/crearAdmin';
export const obtenerPorIdentificacion: string='/obtenerPorIdentificacion';

export const validar: string='/validar';

export const headers= new HttpHeaders({'Content-Type':'application/json'});
export const options = {headers: headers};
export const headersImagen= new HttpHeaders({});
export const optionsImagen = {headers: headersImagen};


export const dia = new Map([
    ["DIA1", "LUNES"],
    ["DIA2", "MARTES"],
    ["DIA3", "MIERCOLES"],
    ["DIA4", "JUEVES"],
    ["DIA5", "VIERNES"],
    ["DIA6", "SABADO"],
    ["DIA7", "DOMINGO"],
]);

export function loadScripts() {
    const dynamicScripts = [
     '../assets/tooglenavbar.js'
    ];
    for (let i = 0; i < dynamicScripts.length; i++) {
      const node = document.createElement('script');
      node.src = dynamicScripts[i];
      node.type = 'text/javascript';
      node.async = false;
      node.charset = 'utf-8';
      document.getElementsByTagName('head')[0].appendChild(node);
    }
  }