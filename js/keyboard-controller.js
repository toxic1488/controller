function Controller(){

	var scope = this;

	var focused = false;
	var target_element;
	var actions = {};
	var code = 0;

	scope.enabled = false;
	scope.keys;
	scope.ACTION_ACTIVATED = "controls:action-activated";
	scope.ACTION_DEACTIVATED = "controls:action-deactivated";

	// if(!event) var event = window.event;

	scope.bindActions = function( actions_to_bind ){
		
		for ( var action in actions_to_bind){
			var _action = actions_to_bind[action];
			actions[action] = {
				keys: _action.keys,
				enabled: _action.enabled !== undefined ? _action.enabled : false
			};
		}

		console.log("binded actions", actions);
	}

	scope.enableAction = function( action_name ){
		if( actions[action_name]!= null ) actions[action_name].enabled = true;
	}

	scope.disableAction = function( action_name ){
		if( actions[action_name]!= null ) actions[action_name].enabled = false;
	}

	scope.attach = function( target, dont_enable ){
		target_element = target;
		target_element.addEventListener("keydown", keyDown);
		target_element.addEventListener("keyup", keyUp);

	}

	scope.detach = function(){
		console.log("detach");
		target_element.removeEventListener("keydown", keyDown);
		target_element.removeEventListener("keyup", keyUp);
		target_element = null;
	}

	function keyDown( event ){
		//console.log("keyDown", event.keyCode );
		var myEvent = new CustomEvent(scope.ACTION_ACTIVATED, {
			detail: {
				keyCode: event.keyCode
			}
		});
		code = event.keyCode;
		window.dispatchEvent( myEvent );
	}

	function keyUp( event ){
		// var myEvent = new CustomEvent(scope.ACTION_DEACTIVATED, {
		// 	detail: {
		// 		keyCode: event.keyCode
		// 	}
		// });
		code = 0;
		//window.dispatchEvent( myEvent );
	}

	scope.isActionActive = function( action ){
		var check = false;
		if( actions[action] != null){ 
			if( actions[action].enabled ) check = true;
			for ( var _action in actions){
				if( _action == action){
					for (var i = 0; i < actions[_action].keys.length; i++) {
						if( code == actions[_action].keys[i]) check = true;
						//if ( actions[_action].keys[i] == keyDown) check = true;
					}
				}
			}
		}	
		return check;
	}

	scope.isKeyPressed = function( keyCode ){
		return code == keyCode;
	}

	return scope;
}