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

	var buttons = new Array(7);

	for (var i = 0; i < buttons.length; i++){

		buttons[i] = document.createElement('input');
		buttons[i].type = 'button';
		buttons[i].id = 'button' + i;
		document.body.appendChild(buttons[i]);
		document.getElementById(buttons[i].id).onclick = function(){
			out(+this.id[this.id.length - 1]);
		}
	}
	

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

	buttons[0].value = 'bindActions';
	buttons[1].value = 'enableAction';
	buttons[2].value = 'disableAction';
	buttons[3].value = 'attach';
	buttons[4].value = 'detach';
	buttons[5].value = 'isActionActive';
	buttons[6].value = 'isKeyPressed';

	function out( number ) {

		switch (number){

			case 0:
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
				break;

			case 1:
				controller.enableAction('right');
				break;

			case 2:
				controller.disableAction('right');
				break;

			case 3:
				controller.attach(window);
				break;

			case 4:
				controller.detach(window);
				break;

			case 5:
				console.log(controller.isActionActive("right"));
				break;

			case 6:
				console.log(controller.isKeyPressed(39));
				break;

			default:
				return;
		}
	}

	controller.setEnabled({
		keyboard: true,
		mouse: !true,
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
