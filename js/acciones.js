// JavaScript Document


$(document).ready(function(e) {
	var abecedario=['A','B','C','D','E','F','G','H','I','J','K','L','M','N','Ñ','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
    var encontradas = 0;
	var oportunidades=0;
	var palabra_oculta="";
	var palabra_actual="";
	var temp="";
	var posicion_actual=0;
	var letra_actual=0;
	var sonido=0;
	var vibrar=0; 
	
function conectar_base()
 {

			db = window.sqlitePlugin.openDatabase({name: "preferencias.db", createFromLocation: 1});
						db.transaction(function(tx) {
        tx.executeSql("select sonido, vibrar from configuracion", [], function(tx, res) {
	 sonido=res.rows.item(0).sonido;
	 vibrar=res.rows.item(0).vibrar;
	 alert ("bd sonido: " + res.rows.item(0).sonido);
	 alert ("bd vibrar: " + res.rows.item(0).vibrar);
          if (res.rows.item(0).sonido == 0)
		   {
		    $("#btn_sonido").removeClass('ui-icon-audio');
			$("#btn_sonido").addClass('ui-icon-delete');			
		   }
		  else
		   {
	 		$("#btn_sonido").removeClass('ui-icon-delete');
			$("#btn_sonido").addClass('ui-icon-audio');
			   
		   }
		   
		   if (res.rows.item(0).vibrar == 0)
		   {
			  		$("#btn_vibrar").removeClass('ui-icon-power');
			$("#btn_vibrar").addClass('ui-icon-delete');
		   }
		  else
		   {
			   		$("#btn_vibrar").removeClass('ui-icon-delete');
			$("#btn_vibrar").addClass('ui-icon-power');
		   }
		  
        });
      });

 }
 

	function nueva_palabra_bd($id_palabra)
	{ 

      oportunidades=6;

	  $('#imagen').attr('src', 'recursos/imagenes/' + oportunidades +'.png');
	  
  	 $('#palabra').css('display', '')
	 $('#palabra_error').text('');
	 $('#palabra_error').css('display','none');
	  
	  $('#palabra').removeClass("error");
      $("#palabra").removeClass('acierto');

$.ajax({
	type: "POST",
	url: "http://192.168.1.30/buscar_palabra.php",
	data: "clave=" + $id_palabra,
    error : function (){ 
	alert ("no se recibe respuesta del servidor");
	}, 
    success: function (msj) 
	{
           palabra_actual = msj.substring(1, msj.length-1);
palabra_actual = palabra_actual.toUpperCase();


				
alert (palabra_actual);
         //palabra_actual = "E JE";
		   	 palabra_oculta="";
	 for(x=0;x<palabra_actual.length;x++)
	 	{
		    if (palabra_actual.charAt(x) != " ")
			 {
		 	palabra_oculta=palabra_oculta + "_";
			 }
			 else
			 {				 
 		    palabra_oculta=palabra_oculta + " ";
			 }
		}
	$('#palabra').text(palabra_oculta);
	$('#actual').text(abecedario[0]);

	posicion_actual=0; 
	     $('.botones').attr('disabled',false);
    }
});

/*		$.ajax({
			type: "POST",
			url: "http://192.168.1.30/buscar_palabra.php",
			data: "clave=" + $id_palabra
		}).done(function(msj){
			

		});		*/
	}
	
	$('#actual').on('tap', function(){
//			alert ("sonido: " + sonido + " vibrar: " + vibrar);
			
		letra_actual = $('#actual').html();
		temp = "";
	 for (x=0; x<palabra_actual.length;x++)
	  {
		  

        if (palabra_actual.charAt(x) == " ")
		 {
			temp = temp + " "; 
		 }
		else if (palabra_actual.charAt(x) == letra_actual.charAt(0))
		 {

		  temp = temp + letra_actual;
		  
		 }
		else
		 {
		  temp = temp + palabra_oculta.charAt(x); 
		 }
	  }
	    if (palabra_oculta != temp)
		 {
			if (sonido == 1)
			  {
				navigator.notification.beep(2);	    
			  }
		  $("#palabra").addClass("animated flipOutX").one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
	 $("#palabra").removeClass("animated");   	 
	 $("#palabra").removeClass("flipOutX");
	 		  		  palabra_oculta = temp;
					  

					  
		  $('#palabra').text(palabra_oculta);		
	  $("#palabra").addClass("animated flipInX").one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){

		  	 $("#palabra").removeClass("animated");   	 
	 $("#palabra").removeClass("flipInX");
	 
	  		if (palabra_oculta == palabra_actual)
		 { 
		 $("#palabra").addClass('acierto');
		 			 if (sonido == 1)
			  {
				navigator.notification.beep(3);	    
			  }
			 $("#palabra").addClass("animated tada").one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){

		  	 $("#palabra").removeClass("animated");   	 
	 $("#palabra").removeClass("tada");
	 $("#encontradas").text(parseInt($("#encontradas").text())+1);
	 $("#contador").text(	 $("#encontradas").text());
	 
			 	   $("#acierto").popup();
  $("#acierto").popup("open");	 
  
			 });
		 }

	  });



		  });

		  
		 }
		else
		 {
			 oportunidades = oportunidades - 1;
			 if (vibrar == 1)
			  {
             navigator.notification.vibrate(1000);
			  }
			 if (sonido == 1)
			  {
				navigator.notification.beep(1);	    
			  }
 		  $("#palabra").addClass("animated shake").one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
		  

			$("#palabra").removeClass("animated");   	 
	        $("#palabra").removeClass("shake");  	 
			$('#imagen').attr('src', 'recursos/imagenes/' + oportunidades +'.png');

		   if (oportunidades<=0)
		    {
				     $('.botones').attr('disabled',true);
				$("#palabra").addClass("animated flipOutX").one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
	 $("#palabra").removeClass("animated");   	 
	 $("#palabra").removeClass("flipOutX");
	
	$('#palabra').addClass("error"); 
	$('#palabra').text(palabra_actual);
	
				$("#palabra").addClass("animated flash").one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){

		  	 $("#palabra").removeClass("animated");   	 
	 $("#palabra").removeClass("flash");
	 $('#palabra').css('display', 'none');
 $('#palabra_error').text(palabra_actual);
	 $('#palabra_error').css('display','inline-block');
	 setTimeout(function(){  
	 $("#palabra_error").addClass("animated hinge").one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){


		  	 $("#palabra_error").removeClass("animated");   	 
	 $("#palabra_error").removeClass("hinge");
	 $('#palabra_error').text("");
	   $("#error").popup();
  $("#error").popup("open");	 
  		$('#btn_comenzar').css('visibility','visible');
	  });
	 }, 1000);
	 

	  });
				
				});
				
			}
		  

	 

		  });
		
		 }
		
	});
	
document.addEventListener("deviceready",function(){
     $('.botones').attr('disabled',true);
	 conectar_base();
	 
	$('#btnJuego').on('tap', function(){
	   var ancho = ($('#principal').width()/6.5);
	   $('#imagen').width(ancho);
	});
	
	$('#btn_otra').on('tap', function(){
		  $("#acierto").popup("close");	 
	   nueva_palabra_bd(Math.floor((Math.random() * 89) + 1));
	});
	$('#btn_comenzar').on('tap',function(){
		$('#encontradas').text('0');		
		nueva_palabra_bd(Math.floor((Math.random() * 89) + 1));
		$('#btn_comenzar').css('visibility', 'hidden');
		
	});
	

	
	
	
//boton siguiente	
	$('#siguiente').on('click',function(){
		$('#actual').stop().animate({opacity:'0,0'}, {duration:80, complete:function(){
			if(posicion_actual<26)
				{posicion_actual=posicion_actual+1;
				}
			else
				{posicion_actual=0;
				}
			$('#actual').text(abecedario[posicion_actual]);
			$('#actual').stop().animate({opacity:'1'},200);}		
		});
	});
//fin de boton siguiente
//boton anterior
	$('#anterior').on('click',function(){
		$('#actual').stop().animate({opacity:'0,0'}, {duration:80, complete:function(){
			if(posicion_actual>0)
				{posicion_actual=posicion_actual-1;
				}
			else
				{posicion_actual=26;
				}
			$('#actual').text(abecedario[posicion_actual]);
			$('#actual').stop().animate({opacity:'1'},200);}		
		});
	});
//fin de boton anterior
	
	$("#btn_sonido").on('click',function(){
		if($("#btn_sonido").hasClass('ui-icon-audio'))
			{
			 db.transaction(function(tx) {

              tx.executeSql("UPDATE configuracion SET sonido = (?) WHERE id = 1", [0], function(tx, res) {
				  sonido=0;
			  			$("#btn_sonido").removeClass('ui-icon-audio');
			$("#btn_sonido").addClass('ui-icon-delete');
			alert('El sonido se apagó');
			    }, function(e) {
            alert ("ERROR: " + e.message);			  
			  }); 	   
             });


			}
		else
			{
			 db.transaction(function(tx) {
              tx.executeSql("UPDATE configuracion SET sonido = (?) WHERE id = 1", [1], function(tx, res) {
				  sonido=1;
			$("#btn_sonido").removeClass('ui-icon-delete');
			$("#btn_sonido").addClass('ui-icon-audio');
			alert('El sonido se aprendió');
			navigator.notification.beep(1);
			    }, function(e) {
            alert ("ERROR: " + e.message);			  
			  }); 	   
             });

			}
	});//click btn_sonido
	
	$("#btn_vibrar").on('click',function(){
		if($("#btn_vibrar").hasClass('ui-icon-power'))
			{db.transaction(function(tx) {
              tx.executeSql("UPDATE configuracion SET vibrar = (?) WHERE id = 1", [0], function(tx, res) {
				  vibrar = 0;
			  			$("#btn_vibrar").removeClass('ui-icon-power');
			$("#btn_vibrar").addClass('ui-icon-delete');
			alert('Se apagó la vibracion');
			    }, function(e) {
            alert ("ERROR: " + e.message);			  
			  }); 	   
             });

			}
		else
			{
			db.transaction(function(tx) {
              tx.executeSql("UPDATE configuracion SET vibrar = (?) WHERE id = 1", [1], function(tx, res) {
				  vibrar = 1;
			  			$("#btn_vibrar").removeClass('ui-icon-delete');
			$("#btn_vibrar").addClass('ui-icon-power');
			alert('Se aprendió la vibracion');
			navigator.notification.vibrate(1000);

			    }, function(e) {
            alert ("ERROR: " + e.message);			  
			  }); 	   
             });
			}
	});//click btn_vibrar
}); //deviceready
});//ready

