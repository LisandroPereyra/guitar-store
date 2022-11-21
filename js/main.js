
//let stock=[];
let gestor;
let carrito=[]


//buscanr los productos en local storage
async function getData(){
    const dataStock = "JSON/data.json";
    let resp = await fetch(dataStock).then(respuesta=> respuesta.json())
    return resp;
}

async function getCart(){
    
    let respCarrito = JSON.parse( localStorage.getItem(clave_carrito) ) || [];
    return respCarrito;

}

const clave_carrito = "carrito";


//inicializar stock 
document.addEventListener("DOMContentLoaded",async()=>
{
    
    gestor = new Stock(await getData(), await getCart());
    gestor.getStocklist();
    gestor.getCartlog();
    
}
)

//agregar producto al carrito
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

//eliminar productos del carrito
function eliminarProducto(id){
      gestor.restarCantidad(id);
      localStorage.setItem("carrito", JSON.stringify(carrito));

}



//escucha el input y busca productos relacionados con lo que ingresa el usuario
document.querySelector('#buscar').addEventListener('keyup', () => {

    let q = document.querySelector('#buscar').value;

  
    if( q.length >= 2 ) { 


        gestor.mostrarHeader(`Resultados para: ${q}`);
        let busqueda =  gestor.buscar( q );
        gestor.cargarStock(busqueda)       

    } else if ( q.length == 0 ) {
        
          
        
        gestor.mostrarHeader(`Todos los productos en stock`);
        gestor.ordenarDestacado()
    }

    else{
        gestor.mostrarHeader(`No se encontraron productos para: ${q}`); 
    }

})


let ordenMenor = document.getElementById("menor");
     ordenMenor.addEventListener('click', ()=>{
      let menor = gestor.ordenarMenor()
      gestor.mostrarHeader(`Menor precio`);
      gestor.cargarStock(menor);
    })
 
    
let ordenMayor = document.getElementById("mayor");
    ordenMayor.addEventListener('click', ()=>{
      let mayor =  gestor.ordenarMayor()
      gestor.mostrarHeader(`Mayor precio`);
      gestor.cargarStock(mayor);
   })
  
   let ordenDestacado = document.getElementById("destacado");
   ordenDestacado.addEventListener('click', ()=>{
    gestor.mostrarHeader(`Productos destacados`);
    gestor.ordenarDestacado();
     
  })   

  let finalizarPedido = document.getElementById("finalizar");
  finalizarPedido.addEventListener('click', ()=>{
   gestor.finalizarCompra();
   
   

   
    
 })   