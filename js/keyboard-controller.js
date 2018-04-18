function Controller(){

	var scope = this;

	var focused = false;
	var target_element;
	var actions = {};


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
				enabled: _action.enabled !== undefined ? _action.enabled : true,
				is_active: false
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

		for ( var action in actions){

			var _action = actions[action];
			var _keys = _action.keys;

			for (var i = 0; i < _keys.length; i++) {

				if( _keys[i] == event.keyCode && !_action.is_active ) {

					_action.is_active = true;

					if( _action.enabled ){

						var key_event = new CustomEvent(scope.ACTION_ACTIVATED, {
							detail: {
								keyCode: event.keyCode,
								action: action
							}
						});
						// code = event.keyCode;
						window.dispatchEvent( key_event );
					}

				}
			}
		}

	}

	function keyUp( event ){

		for ( var action in actions){

			var _action = actions[action];
			var _keys = _action.keys;

			for (var i = 0; i < _keys.length; i++) {
				if( _keys[i] == event.keyCode) {

					_action.is_active = false;

					if( _action.enabled ){

						var key_event = new CustomEvent(scope.ACTION_DEACTIVATED, {
							detail: {
								keyCode: event.keyCode,
								action: action
							}
						});

						// code = 0;
						window.dispatchEvent( key_event );
					}

				}
			}
		}

	}

	scope.isActionActive = function( action ){
		var _action = actions[action];
		if( !_action ) return;	
		return _action.is_active;
	}

	scope.isKeyPressed = function( keyCode ){
		return code == keyCode;
	}

	return scope;
}