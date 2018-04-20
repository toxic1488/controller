var controller = new Controller();

controller.bindActions (
	{
		"left":{
			keys: [37, 65],
			gestures: ["swipe_left", "mouse_swipe_left"]
		},
		"jump":{
			keys: [32]
		},
		"right":{
			keys: [39, 68],
			gestures: ["swipe_right", "mouse_swipe_right"]
			//enabled: false
		}
	}
);

	
var square = document.createElement('div');
window.onload = function(){


	// SQUARE
	square.style.display = 'block';
	square.style.width = '50px';
	square.style.height = '50px';
	square.style.background = 'black';
	square.style.position = 'absolute';
	square.style.top = '100px';
	square.style.left = '300px';
	square.style.marginLeft = 0;
	square.style.marginTop = 0;
	document.body.appendChild(square);


	// TEST BUTTONS
	function initButton( button_name, buttonAction ){
		var button = document.createElement('input');
		button.value = button_name;
		button.type = 'button';
		button.onclick = buttonAction;
		document.body.appendChild(button);
	}

	//
	initButton( 'bindActions', function(){
		controller.bindActions (
			{
				"up":{
					keys: [38, 87],
					gestures: ["swipe_up", "mouse_swipe_up"]
				},
				"down":{
					keys: [40, 83],
					gestures: ["swipe_down", "mouse_swipe_down"]
				}
			}
		);
	});

	initButton( 'enableAction', function(){
		controller.enableAction('right');
	});

	initButton( 'disableAction', function(){
		controller.disableAction('right');
	});

	initButton( 'attach', function(){
		controller.attach(window);
	});

	initButton( 'detach', function(){
		controller.detach('right');
	});

	initButton( 'isActionActive', function(){
		console.log(controller.isActionActive("right"));
	});

	initButton( 'isKeyPressed', function(){
		console.log(controller.isKeyPressed(39));
	});

	// Start Controller
	controller.setEnabled({
		keyboard: true,
		mouse: true,
		touch: true
	});

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
