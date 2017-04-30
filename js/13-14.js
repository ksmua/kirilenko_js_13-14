'use strict;'
$(function(){

	var testData = new Array(
		{
			questionNum: 1,
			question: '2+2=',
			ansver1: '5',
			ansver2: '4',
			ansver3: '2*2',
			right: [false, true, true]	
		},
		{
			questionNum: 2,
			question: '2+3=',
			ansver1: '5',
			ansver2: '4',
			ansver3: '2*2',
			right: [true, false, false]	
		},
		{
			questionNum: 3,
			question: '3+3=',
			ansver1: '5*2-2*2',
			ansver2: '7',
			ansver3: '2*2+2',
			right: [true, false, true]	
		}
	);

	localStorage.setItem('test', JSON.stringify(testData));
	var html = $('#template').html();
	
	
	var testList = JSON.parse(localStorage.getItem('test'));
	
	//виводимо питання на екран
	for (i = 0; i < testList.length; i++){
		var content = tmpl(html, testList[i]);
		$('#template').before(content);
	}

	//встановлюємо обробник кліка на кнопку
	$('#check-button').click(function(event){
		event.preventDefault();
		
		var rez = 0;
			var ansverRez = []; //масив для запису стану чекбосів
			var qurentRez = 0; //для підрахунку балів
		
		//проходимо по питаннях
		for (i = 0; i < testList.length; i++){ 
			
			// console.log("question № ", i+1, "==========================================");
			
			var questionObj = document.getElementById("q"+(i+1));
			var ansverObj = testList[i].right; //масив вірних відповідей
			//проходимо по чекбоксах, записуємо результати в масив
			$(questionObj).find("input").each(function(i){
				if( $(this).prop("checked") == true){
					ansverRez.push(true);
				} else {
					ansverRez.push(false);
				};
			});
			
			//порівнюємо масив отриманих відповідей з масивом вірних відповідей
			for (j = 0; j < ansverRez.length; j++){
				if ((ansverRez[j] == true)&&(ansverObj[j] == true) ){//відмічено правельний чекбокс
					qurentRez = qurentRez + 1;
				} else {
					if ((ansverRez[j] == true)&&(ansverObj[j] == false) ){//відмічено не правильний чекбокс
						qurentRez = false;
						j = ansverRez.length;
					}
				};
			};
			//якщо не було неправильної відповіді сумуємо бали за правильно відмічені чекбокси
			if (qurentRez) {
				rez = rez + qurentRez;
			}
			ansverRez = []; //обнуляємо масив стану чекбоксів пред наступним проходом(питанням)
			qurentRez = 0;  //обнуляємо поточну кількість вірних відповідей перед наступним питанням 
		};

		//показуємо результат
		$(".modale").removeClass('hide');
			var message = "Ви набрали ";
		if (rez <= 3 ){
			message = message + rez + " бала(ів). Ви не здали Тест.";
		} else{
			message = message + rez + " бала(ів). Вітаємо! Ви здали Тест.";
		}
		$('.modale-body').append(message);
		
	});

	//встановлюємо обробник кліка на кнопку закриття модального вікна
	$('.close-button').click(function(event){
		event.preventDefault();
		$(":input").prop("checked", false);
		$('.modale-body').empty();
		$(".modale").addClass('hide');
	});

});

