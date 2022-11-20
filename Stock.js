class Stock{

    stockProductos = [];
    productosDestacados = [];
    carrito = [];
   
    constructor(productos,carrito){

            this.stockProductos =  productos
            carrito=this.carrito   

                this.productosDestacados = this.stockProductos.filter( prod => prod.destacado == 1 );

                this.cargarStock(this.productosDestacados);

                this.displayCarrito(carrito)

                this.actualizarContador();




    }    




//alert de toastify
    mostrarToast (texto,duracion,posicion){

        Toastify({
          text: texto,
          duration: duracion,
          gravity: posicion

      }).showToast();


}

//detalles
	/*detalleProducto(id){
		
        const filtroDato = stock.filter(item => item.id == id)
		let result = ""
		filtroDato.forEach(producto => {
			result += `
			<article class="detalle-grid">
				<img src=${producto.img} alt="${producto.marca}" class="img-fluid">
				<div class="detalles-content">
					<h3>${producto.marca}</h3>
					<div class="rating">
						<span>
							<i class="bx bxs-star"></i>
						</span>
						<span>
							<i class="bx bxs-star"></i>
						</span>
						<span>
							<i class="bx bxs-star"></i>
						</span>
						<span>
							<i class="bx bxs-star"></i>
						</span>
						<span>
							<i class="bx bx-star"></i>
						</span>
					</div>
						<p class="price"><b>Precio: </b> $${producto.precio}</p>
						<p class="description">
							<b>Descripcion: </b> <span>Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta quae ad ex sint expedita perspiciatis odit eligendi! Et quia ex aperiam dolorum sunt omnis maiores. Repudiandae delectus iste exercitationem vel?</span>
						</p>
						<p class="description">
							<span>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque voluptates consequuntur in assumenda odit hic, aut cupiditate dolorem aspernatur! Quibusdam iusto magnam vero maxime quisquam voluptatibus minima aliquam molestias, iure ratione commodi, reiciendis quasi.</span>
						</p>

						<div class="bottom">
							<div class="btn__group">
								<button class="btn addToCart" data-id=${producto.id}>Añadir carrito</button>
							</div>
						</div>
				</div>
			</article>
			`
		});
		detalles.innerHTML = result;
	}

*/



    //metodos de busqueda
    buscar( q ) { 
    let search = this.stockProductos.filter( producto => producto.marca.toLowerCase().includes( q.toLowerCase() ) || producto.modelo.toLowerCase().includes( q.toLowerCase() ));      
    //this.cargarStock( search ); 
    console.log(search)
        return search;

                  
    } 

    mostrarHeader( msg ) { 
        const headerProductos = document.querySelector('#headerProductos');
        headerProductos.innerHTML = msg;
    }








    cargarStock(stockArr){

        const stock_div = document.querySelector("#productos");
        stock_div.innerHTML= "";

        if (stockArr.length===0){
            
        }
        else{

                stockArr.forEach((producto) => {
                            let prod = document.createElement("div");
                            prod.classList.add('col-12', 'h200', 'border', 'bg-white', 'rounded', 'mt-3', 'd-flex', 'align-items-center', 'p-3', 'flex-row', 'producto');
                            prod.setAttribute("id","row_"+producto.id);

                            prod.innerHTML= `
                                            
                            <div class=""> <img src="./imagenes/${producto.img}" alt="" width="150" height="150">
                            </div>
                        
                            <div  class="p-3 d-flex flex-column w-60 h-150">
                            <h3> ${producto.marca}  </h3>                                            
                            <p>${producto.modelo.substring(0,120)}</p>
                            <p>${producto.estado.substring(0,120)}</p>
                        </div>

                        <div class="d-flex align-items-center justify-content-center flex-column w-20 h-150">
                            <p class="precio">$${producto.precio}</p>
                            <a href="javascript:agregarProducto(${producto.id})" class="btn btn-primary">Agregar al carrito</a>
                            <a href="card.html?id=${producto.id}" class="btn view">Vista</a>
                        </div>`; 

                            stock_div.appendChild( prod );


                    })


       
            }
    
        }




    
    agregar(infoProducto){

        const existent = this.carrito.some(producto => producto.id===infoProducto.id);

        if(existent){

            const articulos = this.carrito.map(producto=> {

                if(producto.id === infoProducto.id)
                {
                    producto.cantidad++;
                    return producto;
                }
                else{
                    return producto;
                }

                
            })
                this.carrito = articulos
                this.mostrarToast ("Cantidad del producto actualizada",1500,"bottom");
        }
        else{
            this.carrito.push(infoProducto);
            this.mostrarToast ("Añadido al carrito",1500,"bottom");

        }
       this.actualizarCarrito();
       console.log(this.carrito)
    }



    eliminarSeleccion(id){
        
        this.carrito = this.carrito.filter(producto=> producto.id !=id);
        this.displayCarrito(this.carrito);
        this.mostrarToast ("Producto eliminado",1500,"bottom");
    }

    restarCantidad(id){
        let producto = this.carrito.find(producto=>producto.id==id)
       if( producto.cantidad > 1) {
        producto.cantidad-=1;
        //this.cantidad--;
        this.displayCarrito(this.carrito);}
        else{
            this.eliminarSeleccion(id);
        }

        this.contadorCarritoRestar();
        
    }

    
    
    prodCounterup() { 

        let contador = 0;
        this.carrito.forEach(( producto ) => {

            contador = contador + parseInt(producto.cantidad);
        })

        return contador;
    }

    prodCounterdown(){
        let contador = 0;
        this.carrito.forEach((producto)=>{

            contador= parseInt(producto.cantidad) - contador;
        })
        return contador;
    }
    
    actualizarCarrito(){

        this.actualizarContador();
        this.displayCarrito(this.carrito);
        this.guardarCompra();
    }



    actualizarContador(){

        let cantProd = this.prodCounterup();
        let contarCarrito = document.querySelector("#badgeCarrito");
        contarCarrito.innerHTML = cantProd; 
    }

    contadorCarritoRestar(){

        let cantProd = this.prodCounterdown();
        let contarCarrito = document.querySelector("#badgeCarrito");
        contarCarrito.innerHTML = cantProd; 
    }



    displayCarrito(carrito){



        let infoCarrito = document.querySelector("#idCarrito");
        infoCarrito.innerHTML = "";

        let total = 0;

        carrito.forEach((producto)=>{

            const row = document.createElement("div");
            row.classList.add("row");

            total += parseInt(producto.precio)*parseInt(producto.cantidad);

            row.innerHTML= `
                
            <div class="col-3 d-flex align-items-center p-2 border-bottom">
            <img src="${producto.img}" width="80"/>
        </div>

        <div class="col-3 d-flex align-items-center p-2 border-bottom">
            ${producto.marca}
        </div>

        <div class="col-3 d-flex align-items-center justify-content-end p-2 border-bottom">
            $ ${producto.precio}
        </div>

        <div class="col-1 d-flex align-items-center justify-content-end p-2 border-bottom">
            ${producto.cantidad}
        </div>

        <div class="col-2 d-flex align-items-center justify-content-center p-2 border-bottom">
            <a class="aJip" href="javascript:eliminarProducto(${producto.id})">
                <i class="fa-solid fa-square-minus fa-2x"></i>
            </a>
        </div>
`;
        
infoCarrito.appendChild(row);

})
    
        let row = document.createElement('div');
        row.classList.add('row');
        
        row.innerHTML = `   <div class="col-4 d-flex align-items-center justify-content-start p-2 border-bottom">
                                Total a pagar:
                            </div>
                            <div class="col-8 d-flex align-items-center justify-content-end p-2 border-bottom">
                                <b> $ ${total}</b>
                            </div>`;

        infoCarrito.appendChild(row);
    
    
    }   





    guardarCompra(){
        localStorage.clear();
        localStorage.setItem("carrito", JSON.stringify(this.carrito));
    }










    ordenarMenor(){

        

       let stockMenor = this.stockProductos.sort((a,b) =>{
        
            if (a.precio > b.precio) {
                return 1;
            }
            if (a.precio < b.precio) {
                return -1;
            }
        
        return 0;
        })
        console.log(stockMenor)
        return stockMenor;
        
    }  

    ordenarMayor(){


        let stockMayor =this.stockProductos.sort((a,b) =>{
            
            if (a.precio > b.precio) {
                return -1;
            }
            if (a.precio < b.precio) {
                return 1;
            }
            
            return 0;
        })
  
        return stockMayor;
     


    }

    ordenarDestacado(){
        this.cargarStock();
    }

    getStocklist(){
        console.log (this.stockProductos)
    }


}
