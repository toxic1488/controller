var controller = new Controller();
var marginLeft = 0;
var marginTop = 0;

controller.bindActions (
	{
		"left":{
			keys: [37, 65]
		},
		"jump":{
			keys: [32]
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



	window.onload = function(){
		document.getElementById('button_bind').onclick = function(){
			controller.bindActions (
				{
					"up":{
						keys: [38, 87]
					},
					"down":{
						keys: [40, 83]
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
	}


// EVENTS
window.addEventListener( controller.ACTION_ACTIVATED, onActionActivated );
window.addEventListener( controller.ACTION_DEACTIVATED, onActionDeActivated );

function onActionActivated(e) {
	
	if( e.detail.action != undefined ) console.log("onActionActivated", e.detail.action );
	
	// switch( e.details.action ){
	// 	case "jump":
	// 		// move the box to the left
	// 		break;
	// 	default:
	// 		console.log("sorry");
	// }
	if ( controller.isActionActive("jump") ){
		square.style.background = "red";
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
		square.style.marginLeft = marginLeft - 10 + 'px';
		marginLeft -=10;
	}else if( controller.isActionActive("right") ){
		// move the box to the right
		square.style.marginLeft = marginLeft + 10 + 'px';
		marginLeft +=10;
	}

	//optional
	if( controller.isActionActive("up") ){
		// move the box to the left
		square.style.marginTop = marginTop - 10 + 'px';
		marginTop -=10;
	}else if( controller.isActionActive("down") ){
		// move the box to the right
		square.style.marginTop = marginTop + 10 + 'px';
		marginTop +=10;
	}
}
//controller.disableAction("jump");
