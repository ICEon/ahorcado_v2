// JavaScript Document
$(document).ready(function(e) {
	var abecedario=['A','B','C','D','E','F','G','H','I','J','K','L','M','N','Ñ','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
	var palabras=['FRESA','CEREZO','AMNESIA','JAPON','ANIME','AMOR','LOBO','CHICA','ROSA','LIBRO','CONEJO','TINTA','MANGA','FESTIVAL','PRINCIPE','GATO','AZUL','LETRAS','TOKIO','CHOCOLATE'];
	var oportunidades=0;
	var imagen_actual=0;
	var palabra_oculta="";
	var palabra_actual="";
	var posicion_actual=0;
	var letra_actual=0;
	var palabra=[];
	var vibrar=1;
	var sonido=1;
	
	function nueva_palabra_bd()
	{ 
      alert ("dentro");
		$.ajax({
			type: "POST",
			url: "http://192.168.1.30/buscar_palabra.php"
		}).done(function(msj){
			alert(msj);
		
		});
				

			
		
	}
	
	
//document.addEventListener("deviceready",function(){
	$('#btn_comenzar').on('tap',function(){
		$('#encontradas').text('0');
		nueva_palabra_bd();
	});
	function nueva_palabra()
	{var oportunidades=6;
     var imagen_actual=0;
	 $('imagen').attr('src','recursos/imagenes/ahoracado0.jpg');
	 palabra_actual= palabras[Math.floor((Math.random()*19))];
	 palabra_oculta="";
	 for(x=0;x<palabra_actual.length;x++)
	 	{
		 	palabra_oculta=palabra_oculta + "_";
		}
	$('#palabra').text(palabra_oculta);
	$('#actual').text(abecedario[0]);
	alert(palabra_actual);
	posicion_actual=0;
	};
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

