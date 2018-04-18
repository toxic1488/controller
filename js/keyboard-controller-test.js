var controller = new Controller();

controller.bindActions (
	{
		"left":{
			keys: [37, 65]
		},
		"right":{
			keys: [39, 68],
			enabled: false
		},
		"jump":{
			keys: [32]
		}
	}
);

controller.attach( window );


// EVENTS
window.addEventListener( controller.ACTION_ACTIVATED, onActionActivated );

function onActionActivated(e) {
	
	console.log("onActionActivated", e );
	
	// switch( e.details.action ){
	// 	case "jump":
	// 		// move the box to the left
	// 		break;
	// 	default:
	// 		console.log("sorry");
	// }
	if (controller.isActionActive("jump")){
		square.style.background = "red";
	}
}
//GAME STEP
setInterval( gameStep, 40 );
var marginLeft = 0;
function gameStep(){
	if( controller.isActionActive("left") ){
		// move the box to the left
		square.style.marginLeft = marginLeft - 10 + 'px';
		marginLeft -=10;
	}else if( controller.isActionActive("right") ){
		// move the box to the right
		square.style.marginLeft = marginLeft + 10 + 'px';
		marginLeft +=10;
	}

}
controller.disableAction("jump");
