//clases
class Juego {
    constructor(nombre, formato, precio, info){
      this.nombre = nombre;
      this.formato = formato;
      this.precio = precio;
      this.info = info;
    }
}

let carrito = JSON.parse(localStorage.getItem('carrito')) || [];


//array de juegos
const juego1 = new Juego("Elden Ring", "digital", 4999, "un juego de aventura mundo abierto. De los creadores de Dark Souls")
const juego2 = new Juego("Hades", "digital", 329, "un roguelite basado en la mitología griega")
const juego3 = new Juego("Hunt", "digital", 799, "un battleroyale ambientado en los 70'")
const juego4 = new Juego("Portal", "físico, edición coleccionista", 1799, "un clásico de la compañía Valve")

const juegos = new Array(juego1, juego2, juego3, juego4);


const contenedor = document.getElementById('accordion'); //agarro el div contenedor

//crear la carta (individual) y crear todas las cartas
function crearCarta(name, type, price){
    let carta = `
    <div class="card" style="width: 18rem;">
        <div class="card-body">
            <h5 class="card-title">${name}</h5>
            <p class="card-text">${type}</p>
            <p class="card-text">${price} + impuestos</p>
            <button class="agregar_carrito btn btn-primary">A comprar</button>
        </div>
    </div>
    `;
    contenedor.innerHTML+=carta
}

// dejé forEach así no iteraba todo con for
function crearMas(){
    juegos.forEach(juego => crearCarta(juego.nombre, juego.formato, juego.precio))
}
crearMas()

//click para sumar al local storage

function mostraEnPantalla() {
    let sumar = document.getElementsByClassName("agregar_carrito");
    for (let index = 0; index < sumar.length; index++) {
        let element = sumar[index]
        element.addEventListener("click", addToChart)   
        element.addEventListener('click', () => {//se suma la alerta de confirmación de "añadido al carrito"
            Swal.fire ({
                title:'Juego añadido al carrito',
                icon:'success',
                showConfirmButton: true,
                confirmButtonText: 'Confirmar'
            })
        })
    }
}


function addToChart(datos) {
    let dato = datos.path[1].children[0].innerText;
    let obj = juegos.find(o => o.nombre === dato)
    carrito.push(obj)
    const jJSON = JSON.stringify(carrito)
    localStorage.setItem('carrito', jJSON)
}
mostraEnPantalla()



