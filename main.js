
let stock=[];

let gestor;


/*
const dataStock = "/data.json";

fetch(dataStock)
.then(respuesta=> respuesta.json())
.then((datos)=> {
    console.log(datos)
    datos.forEach(producto => {
        
    });
})
*/
async function getData(){
    const dataStock = "/data.json";
    let resp = await fetch(dataStock).then(respuesta=> respuesta.json())
    return resp;
}
   


const clave_carrito = "carrito";

document.addEventListener("DOMContentLoaded",async()=>
{
    carrito = JSON.parse( localStorage.getItem(clave_carrito) ) || [];
    gestor = new Stock(await getData(),carrito);
    gestor.getStocklist();
    // gestor.setup();
}
)

function agregarProducto( id ) {
    
    const prod = document.querySelector('#row_'+id);
    let producto = new Guitarra (   id,
                                   
                                    prod.querySelector('h3').textContent,
                                    prod.querySelector('.precio').textContent.substring(1,6),
                                    prod.querySelector("img").src
                                );

    console.log(producto)
    gestor.agregar( producto );
}

function eliminarProducto(id){
      //gestor.eliminarSeleccion(id);
      gestor.restarCantidad(id);
      localStorage.setItem("carrito", JSON.stringify(carrito));

}




document.querySelector('#buscar').addEventListener('keyup', () => {

    let q = document.querySelector('#buscar').value;

  
    if( q.length >= 2 ) { 


        gestor.mostrarHeader(`Resultados para: ${q}`);
        let busqueda =  gestor.buscar( q );
        gestor.cargarStock(busqueda)       

    } else if ( q.length === 0 ) {
        
        //Muestro todo sino hay nada el buscador   
        
        gestor.mostrarHeader('Todos los productos en stock');
        gestor.cargarStock();//areglar
    } 

})


let ordenMenor = document.getElementById("menor");
     ordenMenor.addEventListener('click', ()=>{
      let menor = gestor.ordenarMenor()
      gestor.cargarStock(menor);
    })
 
    
let ordenMayor = document.getElementById("mayor");
    ordenMayor.addEventListener('click', ()=>{
      let mayor =  gestor.ordenarMayor()
      gestor.cargarStock(mayor);
   })
  
   let ordenDestacado = document.getElementById("destacado");
   ordenDestacado.addEventListener('click', ()=>{
     let destacado =  gestor.ordenarDestacado()
     gestor.cargarStock(destacado);
  })   

   let detalleProducto = document.getElementById("mayor");