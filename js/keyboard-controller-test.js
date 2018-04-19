var controller = new Controller();

controller.bindActions (
	{
		"left":{
			keys: [37, 65],
			gestures: ["swipe_left"]
		},
		"jump":{
			keys: [32]
		},
		"right":{
			keys: [39, 68],
			gestures: ["swipe_right"]
			//enabled: false
		}
	}
);



window.onload = function(){

	square.style.marginLeft = 0;
	square.style.marginTop = 0;

	document.getElementById('button_bind').onclick = function(){
		controller.bindActions (
			{
				"up":{
					keys: [38, 87],
					gestures: ["swipe_up"]
				},
				"down":{
					keys: [40, 83],
					gestures: ["swipe_down"]
				}
			}
		);
	};

	document.getElementById('button_en').onclick = function(){
		controller.enableAction('right');
	};

	document.getElementById('button_dis').onclick = function(){
		controller.disableAction('right');
	};

	document.getElementById('button_attach').onclick = function(){
		controller.attach(window);
	};

	document.getElementById('button_detach').onclick = function(){
		controller.detach(window);
	};

	document.getElementById('button_active').onclick = function(){
		console.log(controller.isActionActive("right"));
	};

	document.getElementById('button_key').onclick = function(){
		console.log(controller.isKeyPressed(39));
	};

	// controller.setEnabled({
	// 	keyboard: true,
	// 	mouse: true,
	// 	touch: !true
	// });

}


// EVENTS
window.addEventListener( controller.ACTION_ACTIVATED, onActionActivated );
window.addEventListener( controller.ACTION_DEACTIVATED, onActionDeActivated );

function onActionActivated(e) {
	
	console.log("onActionActivated", e.detail.action );

	if ( e.detail.action === "jump" ){
		square.style.background = ["red","blue","yellow","green"][~~(Math.random()*4)];
	}

}

function onActionDeActivated(e) {
	
	if( e.detail.action != undefined ) console.log("onActionDeActivated", e.detail.action );
}


//GAME STEP
setInterval( gameStep, 40 );

function gameStep(){

	if( controller.isActionActive("left") ){
		// move the box to the left
		square.style.marginLeft = (parseInt(square.style.marginLeft) - 10) + 'px';

	}else if( controller.isActionActive("right") ){
		// move the box to the right
		square.style.marginLeft = (parseInt(square.style.marginLeft) + 10) + 'px';

	}

	//optional
	if( controller.isActionActive("up") ){
		// move the box to the top
		square.style.marginTop = (parseInt(square.style.marginTop) - 10) + 'px';

	}else if( controller.isActionActive("down") ){
		// move the box to the bottom
		square.style.marginTop = (parseInt(square.style.marginTop) + 10) + 'px';

	}
}
//controller.disableAction("jump");
