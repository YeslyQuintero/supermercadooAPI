//funciones propias de la app YESLY VALENTINA QUINTERO
async function login(){
    var myForm = document.getElementById("myForm");
    var formData = new FormData(myForm);
    var jsonData = {};
    for(var [k, v] of formData){//convertimos los datos a json
        jsonData[k] = v;
    }
    var settings={
        method: 'POST',
        headers:{
            'Accept':'application/json',
            'Content-Type':'application/json'
        },
        body: JSON.stringify(jsonData)
    }
    const request = await fetch("api/auth/login", settings);
    console.log(await request.text());
    if(request.ok){
        location.href = "dashboard.html";
    }
}

function listar(){
    var settings={
        method: 'GET',
        headers:{
            'Accept':'application/json',
            'Content-Type':'application/json'
        },
    }
    fetch("api/products",settings)
    .then(response => response.json())
    .then(function(data){
        //if(data.lenght>0){
            var products = '';
            for(const producto of data){
                console.log(producto.email)
                producto +=
                '<tr>'+
                '<th scope="row">'+producto.id+'</th>'+
                '<td>'+producto.color+'</td>'+
                '<td>'+producto.talla+'</td>'+
                '<td>'+producto.diseño+'</td>'+
                '<td>'+producto.sensacion+'</td>'+
                '<td>'+producto.precio+'</td>'+
                '<td>'+producto.email+'</td>'+
                '<td>'+
                    '<button type="button" class="btn btn-outline-danger" onclick="eliminaProducto(\''+producto.id+'\')"><i class="fa-solid fa-user-minus"></i></button>'+
                    '<a href="#" onclick="verModificarProducto(\''+usuario.id+'\')" class="btn btn-outline-warning"><i class="fa-solid fa-user-pen"></i></a>'+
                    '<a href="#" onclick="verProducto(\''+producto.id+'\')" class="btn btn-outline-info"><i class="fa-solid fa-eye"></i></a>'+
                '</td>'+
              '</tr>';
            }
            document.getElementById("listar").innerHTML = products;
        //}
    })
}

async function sendData(path){
    var myForm = document.getElementById("myForm");
    var formData = new FormData(myForm);
    var jsonData = {};
    for(var [k, v] of formData){//convertimos los datos a json
        jsonData[k] = v;
    }
    const request = await fetch(path, {
        method: 'POST',
        headers:{
            'Accept':'application/json',
            'Content-Type':'application/json'
        },
        body: JSON.stringify(jsonData)
    });
    myForm.reset();
    console.log(await request.text())
}

function eliminaProducto(id){
    var settings={
        method: 'DELETE',
        headers:{
            'Accept':'application/json',
            'Content-Type':'application/json'
        },
    }
    fetch("api/products/"+id,settings)
    .then(response => response.json())
    .then(function(data){
        listar();
        alertas("Se ha eliminado el producto exitosamente",2)
    })
}

function verModificarProducto(id){
    var settings={
        method: 'GET',
        headers:{
            'Accept':'application/json',
            'Content-Type':'application/json'
        },
    }
    fetch("api/products/"+id,settings)
    .then(response => response.json())
    .then(function(producto){

            var cadena='';

            if(producto){
                cadena = '<div class="p-3 mb-2 bg-light text-dark">'+
                '<h1 class="display-6"><i class="fa-solid fa-user-pen"></i>Modificar producto</h1>'+
                '</div>'+

                '<form action="" method="post" id="myForm">'+
                    '<input type="hidden" name="id" id="id" value = "'+producto.id+'">'+
                    '<label for="color" class="form-label">Color</label>'+
                    '<input type="text" name="color" class="form-control" id="color" required value = "'+producto.color+'"> <br>'+
                    '<label for="talla" class="form-label">Talla</label>'+
                    '<input type="text" name="talla" class="form-control" id="talla" required value = "'+producto.talla+'"> <br>'+
                    '<label for="talla" class="form-label">Talla</label>'+
                    '<input type="text" name="diseño" class="form-control" id="diseño" required value = "'+producto.diseño+'"> <br>'+
                    '<label for="diseño" class="form-label">Diseño</label>'+
                    '<label for="sensacion" class="form-label">Sensacion</label>'+
                    '<input type="text" name="sensacion" class="form-control" id="sensacion" required value = "'+producto.sensacion+'"> <br>'+                                                          '<input type="text" name="color" class="form-control" id="color" required value = "'+producto.color+'"> <br>'+
                    '<label for="precio" class="form-label">Precio</label>'+
                    '<input type="text" name="precio" class="form-control" id="precio" required value = "'+producto.precio+'"> <br>'+
                    '<label for="email" class="form-label">Email</label>'+
                    '<input type="email" name="email" class="form-control" id="email" required value = "'+producto.email+'"> <br>'+
                    '<label for="password" class="form-label">Password</label>'+
                    '<input type="password" name="password" class="form-control" id="password" required> <br>'+
                    '<button type="button" class="btn btn-outline-warning" onclick="modificarProducto(\''+producto.id+'\')">Modificar</button>'+
                '</form>';
            }
            document.getElementById("contentModal").innerHTML = cadena;
            var myModal = new bootstrap.Modal(document.getElementById('modalProducto'))
            myModal.toggle();
    })
}

async function modificarProducto(id){
    var myForm = document.getElementById("myForm");
    var formData = new FormData(myForm);
    var jsonData = {};
    for(var [k, v] of formData){//convertimos los datos a json
        jsonData[k] = v;
    }
    const request = await fetch("api/products/"+id, {
        method: 'PUT',
        headers:{
            'Accept':'application/json',
            'Content-Type':'application/json'
        },
        body: JSON.stringify(jsonData)
    });
    listar();
    alertas("Se ha modificado el producto exitosamente",1)
    document.getElementById("contentModal").innerHTML = '';
    var myModalEl = document.getElementById('modalProducto')
    var modal = bootstrap.Modal.getInstance(myModalEl)
    modal.hide();
}

function verProducto(id){
    var settings={
        method: 'GET',
        headers:{
            'Accept':'application/json',
            'Content-Type':'application/json'
        },
    }
    fetch("api/products/"+id,settings)
    .then(response => response.json())
    .then(function(producto){

            var cadena='';

            if(producto){
                cadena = '<div class="p-3 mb-2 bg-light text-dark">'+
                '<h1 class="display-6"><i class="fa-solid fa-user-pen"></i>Visualizar producto</h1>'+
                '</div>'+
                '<ul class="list-group">'+
                '<li class="list-group-item">Color: '+producto.color+'</li>'+
                '<li class="list-group-item">Talla: '+producto.talla+'</li>'+
                '<li class="list-group-item">Diseño: '+producto.diseño+'</li>'+
                '<li class="list-group-item">Sensacion: '+producto.sensacion+'</li>'+
                '<li class="list-group-item">Precio: '+producto.precio+'</li>'+
                '<li class="list-group-item">Email: '+producto.email+'</li>'+
                '</ul>';
            }
            document.getElementById("contentModal").innerHTML = cadena;
            var myModal = new bootstrap.Modal(document.getElementById('modalProducto'))
            myModal.toggle();
    })
}

function alertas(mensaje, tipo){
    if(tipo == 1){//success verde
        color = "success";
    }
    else{//danger rojo
        color = "danger";
    }
    var alerta = '<div class="alert alert-'+color+' alert-dismissible fade show" role="alert">'+
                    '<strong><i class="fa-solid fa-triangle-exclamation"></i></strong>' +
                    mensaje+
                    '<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>'+
                 '</div>';
    document.getElementById("datos").innerHTML = alerta;
}

function registerForm(){
    cadena = '<div class="p-3 mb-2 bg-light text-dark">'+
                '<h1 class="display-6"><i class="fa-solid fa-user-pen"></i>Registrar producto</h1>'+
                '</div>'+

                '<form action="" method="post" id="myForm">'+
                    '<input type="hidden" name="id" id="id">'+
                    '<label for="color" class="form-label">Color</label>'+
                    '<input type="text" name="color" class="form-control" id="color" required> <br>'+
                    '<label for="talla" class="form-label">Talla</label>'+
                    '<input type="text" name="talla" class="form-control" id="talla" required> <br>'+
                    '<label for="diseño" class="form-label">Diseño</label>'+
                    '<input type="text" name="diseño" class="form-control" id="diseño" required> <br>'+
                    '<label for="sensacion" class="form-label">Sensacion</label>'+
                    '<input type="text" name="sensacion" class="form-control" id="sensacion" required> <br>'+
                    '<label for="precio" class="form-label">Precio</label>'+
                    '<input type="text" name="precio" class="form-control" id="precio" required> <br>'+
                    '<label for="email" class="form-label">Email</label>'+
                    '<input type="email" name="email" class="form-control" id="email" required> <br>'+
                    '<label for="password" class="form-label">Password</label>'+
                    '<input type="password" name="password" class="form-control" id="password" required> <br>'+
                    '<button type="button" class="btn btn-outline-info" onclick="registrarProducto()">Registrar</button>'+
                '</form>';
                document.getElementById("contentModal").innerHTML = cadena;
                var myModal = new bootstrap.Modal(document.getElementById('modalProducto'))
                myModal.toggle();
}

async function registrarProducto(){
    var myForm = document.getElementById("myForm");
    var formData = new FormData(myForm);
    var jsonData = {};
    for(var [k, v] of formData){//convertimos los datos a json
        jsonData[k] = v;
    }
    const request = await fetch("api/products", {
        method: 'POST',
        headers:{
            'Accept':'application/json',
            'Content-Type':'application/json'
        },
        body: JSON.stringify(jsonData)
    });
    listar();
    alertas("Se ha registrado el producto exitosamente",1)
    document.getElementById("contentModal").innerHTML = '';
    var myModalEl = document.getElementById('modalProducto')
    var modal = bootstrap.Modal.getInstance(myModalEl)
    modal.hide();
}

function modalConfirmacion(texto, funcion){
    document.getElementById("contenidoConfirmacion").innerHTML = texto;
    var myModal = new bootstrap.Modal(document.getElementById('modalConfirmacion'))
    myModal.toggle();
    var confirmar = document.getElementById("confirmar");
    confirmar.onclick = funcion;
}