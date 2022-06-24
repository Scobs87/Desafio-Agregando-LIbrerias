class Disco {
  constructor(artista, album, genero, precio, cover) {
    this.artista = artista;
    this.album = album;
    this.genero = genero;
    this.precio = precio;
    this.cover = cover;
  }
}

const disco1 = new Disco(
  "Radiohead",
  "Ok Computer",
  "Rock Alternativo",
  300,
  "./Imagenes/ok computer.jpg"
);
const disco2 = new Disco(
  "Gorillaz",
  "Demon Days",
  "Rock Alternativo",
  400,
  "./Imagenes/Gorillaz.jpg"
);
const disco3 = new Disco(
  "The Strokes",
  "Room On Fire",
  "Rock Alternativo",
  350,
  "./Imagenes/Room on Fire.jpg"
);
const disco4 = new Disco(
  "Interpol",
  "Turn On The Bright Lights",
  "Rock Alternativo",
  400,
  "./Imagenes/Interpol.jpg"
);
const disco5 = new Disco(
  "Bjork",
  "Homogenic",
  "Electronica/Trip Hop",
  500,
  "./Imagenes/bjork.jpg"
);
const disco6 = new Disco(
  "Nine Inch Nails",
  "Fragile",
  "Rock Industrial",
  450,
  "./Imagenes/NIN.jpg"
);

const inventarioDiscos = [disco1, disco2, disco3, disco4, disco5, disco6];

const contenedor = document.querySelector("#contenedor");

inventarioDiscos.forEach((disco) => {
  const card = document.createElement("div");
  card.className = "card";
  card.innerHTML = `
  
        <img src="${disco.cover}" alt="" />
        <h4 class="cardArtista">${disco.artista} </h4>
        <p class="cardAlbum bold"> ${disco.album} </p>
        <p class="cardGenero"> ${disco.genero} </p>
        <span class="cardPrecio bold">$${disco.precio} </span>
        <button data-id="${disco.artista}" class="botonSelect">Seleccionar disco</button>
     
  `;
  contenedor.append(card);
});

let carrito = [];

const agregarDisco = (e) => {
  const discoSeleccionado = e.target.getAttribute("data-id");

  const elDisco = inventarioDiscos.find(
    (elDisco) => elDisco.artista == discoSeleccionado
  );

  carrito.push(elDisco);
  mostrarCarrito();

  // localStorage.setItem("carrito", JSON.stringify(carrito));
};

const boton = document.querySelectorAll(".botonSelect");
boton.forEach((boton) => {
  boton.addEventListener("click", agregarDisco);
});

const cartContenedor = document.querySelector("#cartContenedor tbody");

const mostrarCarrito = () => {
  cartContenedor.innerHTML = "";
  carrito.forEach((disco) => {
    const tr = document.createElement("tr");
    tr.className = "cartRow";
    tr.innerHTML = `
        <th scope="row">1</th>
              <td class="table__cover">
                <img src="${disco.cover}" alt="" />
              </td>
              <td class="table__album">${disco.album}</td>
              <td class="table__artista">${disco.artista}</td>
              <td class="table__genero"> ${disco.genero}</td>
              <td class="table__precio"><p>$${disco.precio}</p></td>
              <td class="table__cantidad">
                <input type="number" min="1" value="1" />
                <button data-id= "${disco.album}" id="botonX" class="delete btn btn-danger">X</button>
              </td>
        `;
    cartContenedor.append(tr);
    tr.querySelector(".delete").addEventListener("click", eliminarDisco);
  });
};

// if (localStorage.getItem("carrito")) {
//   carrito = JSON.parse(localStorage.getItem("carrito"));

//   mostrarCarrito();
// }

const eliminarDisco = () => {
  const botonBorrar = document.querySelectorAll("#botonX");
  botonBorrar.forEach((button) => {
    button.addEventListener("click", (e) => {
      const dataDisco = e.target.getAttribute(`data-id`);

      carrito = carrito.filter((e) => e.album != dataDisco);

      e.target.parentElement.parentElement.remove();

      // localStorage.setItem("carrito", JSON.stringify(carrito));
    });
  });
};

// El Toast

const elBotonToast = document.querySelectorAll(".botonSelect");
elBotonToast.forEach((elBotonToast) => {
  elBotonToast.addEventListener("click", () => {
    Toastify({
      text: "Album seleccionado!",
      duration: 3000,
      newWindow: true,
      close: false,
      gravity: "top", // `top` or `bottom`
      position: "left", // `left`, `center` or `right`
      stopOnFocus: false, // Prevents dismissing of toast on hover
      style: {
        background: "linear-gradient(to right, #00b09b, #96c93d)",
      },
      onClick: function () {}, // Callback after click
    }).showToast();
  });
});
