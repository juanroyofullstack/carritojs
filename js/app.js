const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito')
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito')
const listaCursos = document.querySelector('#lista-cursos');
let articulosCarrito = [];

cargarEventListeners()
function cargarEventListeners(){
    // cuando agregas un curso presionando "agragar al carrito"
     listaCursos.addEventListener('click', agregarCurso)
     //elimina cursos del carrito
    carrito.addEventListener('click', eliminarCurso)
    //vacias carrito
    vaciarCarritoBtn.addEventListener('click', ()=> {
        articulosCarrito = [];
        limpiarHTML()
    })
}
function agregarCurso(e){
    e.preventDefault(); 
    if(e.target.classList.contains('agregar-carrito')) {
        const cursoSeleccionado = e.target.parentElement.parentElement;
        leerDatosCurso(cursoSeleccionado)
    }
}
//elimina cursos del carrito
function eliminarCurso(e) {
    console.log('desde eliminarCurso')
    if(e.target.classList.contains('borrar-curso')) {
        const cursoId = e.target.getAttribute('data-id');
        articulosCarrito = articulosCarrito.filter(item => item.id!==cursoId)
        console.log(articulosCarrito,cursoId)
        carritoHTML()
    }
}
// lee el contenido del html q le dimos click y saca el contenido
function leerDatosCurso(curso) {

    const infoCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1
     }
     const existe = articulosCarrito.some(curso => curso.id === infoCurso.id)
     if(existe){
        const cursos = articulosCarrito.map(item=> {
            if(item.id === infoCurso.id) {
                item.cantidad++;
                return item;
            } else {
                return item; 
            }
        });
        articulosCarrito = [...cursos];
     } else {
        articulosCarrito.push(infoCurso)
     }
     console.log(existe)
     carritoHTML()
     console.log(articulosCarrito)
}

function carritoHTML() {
    //limpiar el html
    limpiarHTML()
    // recorre el carrito y genera html
    articulosCarrito.forEach((item) => {
        const { imagen, titulo, precio, cantidad, id} = item;
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
             <img src="${imagen}" width="100">
            </td>
            <td>${titulo}</td>
            <td>${precio}</td>
            <td>${cantidad}</td>
            <td>
             <a href="#" class="borrar-curso" data-id="${id}"> X </a> 
            </td>
        `;
        //agrega el html del carrito en el tbody
        contenedorCarrito.appendChild(row);
    })
}

function limpiarHTML(){

    while(contenedorCarrito.firstChild) {
        contenedorCarrito.removeChild(contenedorCarrito.firstChild)
    }
}