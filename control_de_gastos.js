var restante=0;
const guardarPresupuesto=()=>{
    let presupuesto=parseInt(document.querySelector("#presupuestoInicial").value);

    if(presupuesto<1 || isNaN(presupuesto)){
        mostrarError("#msj-error-pregunta", "CANTIDAD NO VALIDA");
        return;
    }
    localStorage.setItem("presupuesto", presupuesto);
    localStorage.setItem("gastos",JSON.stringify([]));
    actualizarVista();
}

const actualizarVista=()=>{
    let presupuesto=localStorage.getItem("presupuesto");
    restante=presupuesto;

    let divPregunta=document.querySelector("#pregunta");
    let divGastos=document.querySelector("#divGastos");
    let divControlGastos=document.querySelector("#divControlGastos");
    divPregunta.style.display="none";
    divGastos.style.display="none";

    let controlGastos=`<div class="gastos-realizados">
                            <h2>Listado de Gastos</h2>
                            <div class="alert alert=primary">
                            Presupuesto:$ ${presupuesto}</div>
                            <div class="alert alert=success">
                            Restante:$ ${presupuesto}</div>
                        </div>`;

    if(!presupuesto){
        divPregunta.style.display="block";
    }else{
        divPregunta.style.display="none";
        divGastos.style.display="block";
        divControlGastos.innerHTML=controlGastos;
        refrescarListado0()
    }
}

const agregarGasto=()=>{

    let tipoGasto=document.querySelector("#tipoGasto").value;
    let cantidad=document.querySelector("#cantidadGasto").value;

    if(cantidad<1 || isNaN(cantidad) || tipoGasto.trim()===''){
        mostrarError("#msj-error-creargasto", "ERROR EN CAMPOS");
        return;
    }

    if(cantidad>restante){
        mostrarError("#msj-error.creargasto", "CANTIDAD MAYOR A RESTANTE");
        return;
    } 

    let nuevoGasto={
        tipoGasto,
        cantidad
    }

    let gastos=JSON.parse(localStorge.getItem("gatos"));
    gastos.push(nuevoGasto);
    localStorage.setItem("gastos", JSON.stringify(gastos));
    refrescarListado();

    document.querySelector("#formGastos").reset();
}

const refrescarListado0=()=>{
    let presupuesto=localStorage.getItem("presupuesto");
    let gastos=JSON.parse(localStorage.getItem("gastos"));

    let totalGastos=0;
    let listadoHTML=``;
    gastos.map(gasto=>{
        listadoHTML+=`<li class="gastos"> 
                        <p> ${gasto.tipo} 
                        <span class="gasto">$ ${gasto.cantidad}</span>
                        </p>
                    </li>`;
        totalGastos+=parseInt(gasto.cantidad);
    });
    console.log("Total de gastos: "+totalGastos)

    restante=presupuesto-totalGastos;

    let divControlGastos=document.querySelector("#divControlGastos");

    divControlGastos.innerHTML=``;

    if((presupuesto/4)>restante){
        clase="alert alert-danger";  
    }else if((presupuesto/2)>restante){
        clase="alert alert-warning";
    }else{
        clase="alert alert-success";
    }

    divControlGastos.innerHTML=`<div class="gastos-realizados">
                                    <h2>Listado de Gastos</h2>
                                    ${listadoHTML}
                                    <div class="alert alert=primary">
                                    Presupuesto:$ ${presupuesto}</div>
                                    <div class="${clase}">
                                    Restante:$ ${restante}</div>

                                    <button
                                    onclick="reiniciarPresupuesto()"
                                    class="button u-full-width">Reiniciar Presupuesto</button>
                                </div>
                                    "`;
}

const reiniciarPresupuesto=()=>{
    localStorage.clear();
    location.reload(true);
}


const mostrarError=(elemento,  mensaje)=>{
    divError=documento.querySelector(elemento);
    divError.innerHTML='<p class="alert alert-danger error">$(mensaje)</p>';
    setTimeout(()=>(divError.innerHTML=``), 2000);

}