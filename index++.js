//declaracion de la variable bd 

var bd;

function iniciar(){

	var codigo = document.getElementById('codigo');
	var ci = document.getElementById('ci');
	var nombre = document.getElementById('nombre');
	var fecha = document.getElementById('fecha');
	var tipo = document.getElementById('tipo');
	var boton = document.getElementById('boton');
	var borrar = document.getElementById('delete');



	boton.addEventListener('click', agregar, false);
	borrar.addEventListener('click', borrarClave, false);



	var request = indexedDB.open('deusto', 2);
	request.onsuccess = function(e){
		bd = e.target.result;
	}


	request.onupgradeneeded = function(e){
		bd = e.target.result;
		bd.createObjectStore('reclamos', {keyPath: 'codigo'});
	}
}


function agregar(){

	var codigo = document.getElementById('codigo').value;
	var ci = document.getElementById('ci').value;
	var nombre = document.getElementById('nombre').value;
	var fecha = document.getElementById('fecha').value;
	var tipo = document.getElementById('tipo').value;
	

	var reclamo = {codigo: codigo, ci: ci, nombre: nombre, fecha: fecha, tipo: tipo};

	var customerObjecstore = bd.transaction('reclamos', 'readwrite').objectStore('reclamos');
	customerObjecstore.add(reclamo);
	alert ('Registro guardado con exito en la base de datos');
	return false;
	}
	
	
	function borrarClave(){

	var borrar = document.getElementById('deleteClave').value;


	var customerObjecstore = bd.transaction('reclamos', 'readwrite').objectStore('reclamos');
	var registro= customerObjecstore.delete(borrar);
	registro.onsuccess = function(e){
		alert('Registro borrado de la base de datos exitosamente');
		return false;
	}
}


window.addEventListener('load', iniciar, false);

