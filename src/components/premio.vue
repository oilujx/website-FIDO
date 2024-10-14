<script>
import Menu from "./menu.vue"
export default {
    name: 'Autor',    
    components:{
        Menu
    },

    data(){
        return {  
            //urlBaseApi: "http://localhost:5255/api/fido",          
            urlBaseApi: "http://192.168.1.11:5255/api/fido",          
            dato:
            {
                codigoCliente:localStorage.getItem('codigoPremio')                 
            },
            premios: [],                                            
            textoBoton : "Canjear",            
            tituloCard: "Seleccione el premio que desea canjear"           
        }
    },
    methods:{        
        
        mostrarMensaje(titulo, mensaje, icono){
            Swal.fire({
                position: 'center',
                icon: icono,
                title: titulo,
                text:mensaje,
                showConfirmButton: false,
                timer: 2000
            });            
        },        
        async obtenerPremios(dato){ 

            const response = await fetch(`${this.urlBaseApi}/ConsultarPremio`, 
            {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(this.dato)
            });

            const data = await response.json();
                
            this.premios = data.data;                  
        },
        async validarCodigo(){ 

            //Validaciones de campos vacios
            if (!this.registro.Nombre || !this.registro.Direccion || !this.registro.Correo || !this.registro.Peso_Perro || !this.registro.codigoCliente) {
                
                this.mostrarMensaje('Error!', 'Todos los campos son obligatorios.', 'error');
                
                return;
            }

            const response = await fetch(`${this.urlBaseApi}/validarCodigo`, 
            {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(this.registro)
            });

            const resp = await response.json(); 

            if (resp.error != 1) { 
                this.mostrarMensaje('Bien!', resp.mensaje, 'success');                
            }
            else{        
                this.mostrarMensaje('Error!', resp.mensaje, 'error');
            }
        }
    },    
    async mounted()
    {        
        this.obtenerPremios();
    },

         
 // Guardia de ruta al abandonar la página de premios
     beforeRouteLeave(to, from, next) 
    {
      // Remover el estado de validación cuando el usuario salga de la página
      localStorage.removeItem('codigoValidado');
      next(); // Permitir la navegación
    }
}

</script>

<template>
<Menu />
    <div class="card text-bg-dark my-3">
        <div class="card-header text-center">
            <h5 class="card-title">Registro de códigos FIDO</h5>
        </div>
        <div class="card-body">

            <div class="row">
                
                <div class="col-md-8 offset-md-2">

                    <div class="card">
                        <div class="card-header">
                            {{ tituloCard }}
                        </div>
                        <div class="card-body">
                            <div class="container">
                                <div class="row">
                                  <!-- Aquí usamos v-for para iterar sobre el array 'results' -->
                                  <div class="col-md-4" v-for="premio in this.premios" :key="index">
                                    <div class="card">
                                      <!-- Imagen dinámica -->
                                      <img :src="premio.src" class="card-img-top" :alt="premio.Titulo"/>
                                      <div class="card-body">
                                        <!-- Título dinámico -->
                                        <h5 class="card-title">{{ premio.descripcion }}</h5>
                                        <!-- Texto dinámico -->
                                        <p class="card-text">{{ premio.titulo }}</p>
                                        <a href="" class="btn btn-primary" data-mdb-ripple-init>Button</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                           <!--- <form class="row g-3">
                                <div class="col-md-3">
                                    <label for="txtNombre" class="form-label">Nombre</label>
                                    <input type="text" class="form-control" id="txtNombre" required v-model="registro.Nombre" >            
                                </div> 
                                <div class="col-md-3">
                                    <label for="txtTelefono" class="form-label">Teléfono</label>
                                    <input type="text" class="form-control" id="txtTelefono" required v-model="registro.Telefono">            
                                </div>
                                <div class="col-md-3">
                                    <label for="txtDireccion" class="form-label">Dirección</label>
                                    <input type="text" class="form-control" id="txtDireccion" required v-model="registro.Direccion">            
                                </div>
                                <div class="col-md-3">
                                    <label for="txtCorreo" class="form-label">Correo</label>
                                    <input type="email" class="form-control" id="txtCorreo" required v-model="registro.Correo">            
                                </div>                               
                                <div class="col-md-4">
                                    <label for="cmbRaza" class="form-label">Raza del perro</label>
                                    <select class="form-select" id="cmbRaza" v-model="registro.Id_Raza">
                                        <option selected value="0">Seleccionar</option>
                                        <option v-for="raza in this.razas" :key="raza.IdRaza" :value="raza.IdRaza">
                                            {{ raza.nombre }}
                                        </option>
                                    </select>
                                </div>
                                <div class="col-md-4">
                                    <label for="txtPeso" class="form-label">Peso del perro</label>
                                    <input type="text" class="form-control" id="txtPeso" required v-model="registro.Peso_Perro">            
                                </div>                                  
                                <div class="col-md-4">
                                    <label for="txtCodigo" class="form-label">Código</label>
                                    <input type="text" class="form-control" id="txtCodigo" required v-model="registro.codigoCliente">            
                                </div>     
                                <div class="col-md-12 text-center">
                                    <button  class="btn btn-success mx-2" @click.prevent="validarCodigo">{{textoBoton}}</button>                                                     
                                </div>      
                            </form>-->
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>
<style scoped>
.mia {
  height: 300px;
  overflow: scroll;
}
</style>