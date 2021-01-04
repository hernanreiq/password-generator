(function(){
    var cantidad_caracteres = document.getElementById('cantidad-caracteres');
    var resultado = document.getElementById('resultado');
    var copiar = document.getElementById('copiar');
    var alerta_copiar = document.getElementById('alerta-copiar');

    var cadena_resultado = "";

    /*
        OBJETO CON LA CONFIGURACION INICIAL BASICA DEL GENERADOR DE CONTRASEÑAS
    */
    var configuracion = {
        minusculas: true,
        mayusculas: true,
        numeros: true,
        simbolos: true,
        cantidad_caracteres: parseInt(cantidad_caracteres.value)
    }

    /* 
        OBJETO CON ARRAY DE ELEMENTOS DISPONIBLES PARA CREAR UNA CONTRASEÑA ALEATORIA
    */
    var caracteres = {
        letras: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'],
        numeros: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
        simbolos: ['/', '*', '-', '.', '@', '#', '!', '$', '%', '&', '(', ')', '=', '+', '_', '{', '}', '[', ']', ';', ',', ':', '<', '>', '?', '¿', '¡']
    }

    var minusculas = document.getElementById('minusculas');
    var mayusculas = document.getElementById('mayusculas');
    var numeros = document.getElementById('numeros');
    var simbolos = document.getElementById('simbolos');

    /*
        EVENTO CLICK DE LAS CONFIGURACIONES ACTIVADAS Y DESACTIVADAS
    */
    minusculas.addEventListener('click', function(){cambiar_estado('minusculas', this, configuracion);});
    mayusculas.addEventListener('click', function(){cambiar_estado('mayusculas', this, configuracion);});
    numeros.addEventListener('click', function(){cambiar_estado('numeros', this, configuracion);});
    simbolos.addEventListener('click', function(){cambiar_estado('simbolos', this, configuracion);}); 

    /*
        FUNCION PARA CAMBIAR EL ESTADO DE ACTIVO A DESATIVADO
    */
    function cambiar_estado(propiedad, btn, configuracion){
        if(configuracion[propiedad] == true){
            btn.classList.add('negativo');
            btn.classList.remove('positivo');
            btn.innerText = "Desactivado";
            configuracion[propiedad] = false;
        } else if (configuracion[propiedad] == false){
            btn.classList.add('positivo');
            btn.classList.remove('negativo');
            btn.innerText = "Activado";
            configuracion[propiedad] = true;
        }
    }

    /*
        AUMENTAR Y DISMINUIR LA CANTIDAD DE CARACTERES PARA GENERAR LA CONTRASEÑA
    */
    var boton_menos = document.getElementById('negativo');
    boton_menos.addEventListener('click', function(){
        if (cantidad_caracteres.value <= 8){
            cantidad_caracteres.value = 18;
        } else if (cantidad_caracteres.value <= 18){
            cantidad_caracteres.value = cantidad_caracteres.value - 1;
        } else if (cantidad_caracteres.value > 18){
            cantidad_caracteres.value = configuracion.cantidad_caracteres - 1;
        }
        configuracion.cantidad_caracteres = cantidad_caracteres.value;
    });

    var boton_mas = document.getElementById('positivo');
    boton_mas.addEventListener('click', function(){
        if (cantidad_caracteres.value >= 8 && cantidad_caracteres.value <= 17){
            cantidad_caracteres.value = parseInt(cantidad_caracteres.value) + 1;
        } else if (cantidad_caracteres.value >= 18){
            cantidad_caracteres.value = 8;
        }
        configuracion.cantidad_caracteres = cantidad_caracteres.value;
    });

    function generar_clave(){
        cadena_resultado = "";
        if (configuracion.minusculas || configuracion.mayusculas || configuracion.numeros || configuracion.simbolos){
            for(var i = 1; i <= configuracion.cantidad_caracteres; i++){
                var num_caracter_aleatorio = Math.ceil(Math.random() * 4);
                switch(num_caracter_aleatorio){
                    case 1:
                        if(configuracion.minusculas){
                            var num_aletorio = Math.floor(Math.random() * caracteres.letras.length);
                            cadena_resultado = cadena_resultado + caracteres.letras[num_aletorio];
                        } else {
                            i = i - 1;
                        }
                        break;
    
                    case 2:
                        if(configuracion.mayusculas){
                            var num_aletorio = Math.floor(Math.random() * caracteres.letras.length);
                            cadena_resultado = cadena_resultado + (caracteres.letras[num_aletorio]).toUpperCase();
                        } else {
                            i = i - 1;
                        }
                        break;
    
                    case 3:
                        if(configuracion.numeros){
                            var num_aletorio = Math.floor(Math.random() * caracteres.numeros.length);
                            cadena_resultado = cadena_resultado + caracteres.numeros[num_aletorio];
                        } else {
                            i = i - 1;
                        }
                        break; 
    
                    case 4:
                        if(configuracion.simbolos){
                            var num_aletorio = Math.floor(Math.random() * caracteres.simbolos.length);
                            cadena_resultado = cadena_resultado + caracteres.simbolos[num_aletorio];
                        } else {
                            i = i - 1;
                        }
                        break;  
    
                    default:
                        i = i - 1;
                        break;
                    
                }
            }
        }
        
        resultado.value = cadena_resultado;
    }

    var boton_generar = document.getElementById('generar');
    boton_generar.addEventListener('click', generar_clave);

    copiar.addEventListener('click', function(){
        resultado.select();
        document.execCommand('copy');
        alerta_copiar.style.display = "block";
        setTimeout(function(){
            alerta_copiar.style.display = "";
        }, 5000);
    });

    generar_clave();
}());