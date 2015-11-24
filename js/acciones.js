// JavaScript Document
$(document).ready(function(e) {
	var abecedario=['A','B','C','D','E','F','G','H','I','J','K','L','M','N','Ñ','O','P','Q','R','S','T','U','V','W','X','Y','Z'];

	var oportunidades=0;
	var imagen_actual=0;
	var palabra_oculta="";
	var palabra_actual="";
	var temp="";
	var posicion_actual=0;
	var letra_actual=0;
	var palabra=[];
	var vibrar=1;
	var sonido=1;
	
	function nueva_palabra_bd($id_palabra)
	{ 
     var oportunidades=6;
     var imagen_actual=0;

//     alert ($datos);
		$.ajax({
			type: "POST",
			url: "http://192.168.1.30/buscar_palabra.php",
			data: "clave=" + $id_palabra
		}).done(function(msj){
			
           palabra_actual = msj.substring(1, msj.length-1);
		});
				

	 palabra_oculta="";
	 for(x=0;x<palabra_actual.length;x++)
	 	{
		    if (palabra_actual.charAt(x) != " ")
			 {
		 	palabra_oculta=palabra_oculta + "_";
			 }
 		    palabra_oculta=palabra_oculta + " ";
		}
		
	$('#palabra').text(palabra_oculta);
	$('#actual').text(abecedario[0]);
	alert(palabra_actual);
	posicion_actual=0; 

		
	}
	
	$('#actual').on('tap', function(){
		letra_actual = $('#actual').html();
		alert ("letra Actual " + letra_actual);
		temp = "";
	 for (x=0; x<palabra_oculta.length;x++)
	  {
		if (palabra_actual.charAt(x) == letra_actual)
		 {
			 alert (letra_actual);
		  temp = temp + letra_actual;
		  
		 }
		else
		 {
		  temp = temp + palabra_oculta.charAt(x); 
		 }
	  }
	    if (palabra_oculta != temp)
		 {
          alert ("cambio");
		  $("#palabra").addClass("flipt animated");
		  palabra_oculta = temp;
		  $('#palabra').text(palabra_oculta);		  
		 }
		else
		 {
 		  $("#palabra").addClass("shake animated");
			 //shake
		 }
		
	});
	
//document.addEventListener("deviceready",function(){
	$('#btn_comenzar').on('tap',function(){
		$('#encontradas').text('0');		
		nueva_palabra_bd(Math.floor((Math.random() * 89) + 1));
		
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
			{//sonido=0;
			$("#btn_sonido").removeClass('ui-icon-audio');
			$("#btn_sonido").addClass('ui-icon-delete');
			alert('El sonido se apagó');
			}
		else
			{//sonido=1;
			$("#btn_sonido").removeClass('ui-icon-delete');
			$("#btn_sonido").addClass('ui-icon-audio');
			alert('El sonido se aprendió');
			navigator.notification.beep(1);
			}
	});//click btn_sonido
	$("#btn_vibrar").on('click',function(){
		if($("#btn_vibrar").hasClass('ui-icon-power'))
			{//vibrar=0;
			$("#btn_vibrar").removeClass('ui-icon-power');
			$("#btn_vibrar").addClass('ui-icon-delete');
			alert('Se apagó la vibracion');
			}
		else
			{//vibrar=1;
			$("#btn_vibrar").removeClass('ui-icon-delete');
			$("#btn_vibrar").addClass('ui-icon-power');
			alert('Se aprendió la vibracion');
			navigator.notification.vibrate(1000);
			}
	});//click btn_vibrar
//}); //deviceready
});//ready

