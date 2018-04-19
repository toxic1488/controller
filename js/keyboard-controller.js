function Controller(){

	var scope = this;

	var focused = false;
	var target_element;
	var actions = {};


	scope.enabled = false;
	scope.ACTION_ACTIVATED = "controls:action-activated";
	scope.ACTION_DEACTIVATED = "controls:action-deactivated";


	scope.bindActions = function( actions_to_bind ){
		
		for ( var action in actions_to_bind){
			var _action = actions_to_bind[action];
			var _keys = {};
			for (var i = 0; i < _action.keys.length; i++) {
				_keys[i] = {
					key: _action.keys[i],
					pressed: false
					}
			}
			//console.log(_keys);
			actions[action] = {
				keys: _keys,
				enabled: _action.enabled !== undefined ? _action.enabled : true,
				is_active: false
			};
		}

		console.log("binded actions", actions);
	}

	scope.enableAction = function( action_name ){
		if( actions[action_name]!= null ) {
			actions[action_name].enabled = true;
			//actions[action_name].is_active = true;
		}
	}

	scope.disableAction = function( action_name ){
		if( actions[action_name]!= null ) {
			actions[action_name].enabled = false;
			actions[action_name].is_active = false;
		}
	}

	scope.attach = function( target, dont_enable ){
		target_element = target;
		target_element.addEventListener("keydown", keyDown);
		target_element.addEventListener("keyup", keyUp);

	}

	scope.detach = function(){
		if( target_element!= null) {

			console.log("detach");
			target_element.removeEventListener("keydown", keyDown);
			target_element.removeEventListener("keyup", keyUp);
			target_element = null;
		} else {
			console.log("nothing to detach");
		}
	}

	function keyDown( event ){

		for ( var action in actions){

			var _action = actions[action];
			var _keys = _action.keys;

			for (var i in _keys) {

				if( _keys[i].key == event.keyCode && !_action.is_active ) {

					
					_keys[i].pressed = true;

					if( _action.enabled ){

						_action.is_active = true;

						var key_event = new CustomEvent(scope.ACTION_ACTIVATED, {
							detail: {
								keyCode: event.keyCode,
								action: action
							}
						});

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

			for (var i in _keys) {

				if( _keys[i].key == event.keyCode) {

					
					_keys[i].pressed = false;

					if( _action.enabled ){

						_action.is_active = false;

						var key_event = new CustomEvent(scope.ACTION_DEACTIVATED, {
							detail: {
								keyCode: event.keyCode,
								action: action
							}
						});

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

		for ( var action in actions){

			var _keys = actions[action].keys;

			for (var i in _keys) {
				if( _keys[i].key == keyCode && _keys[i].pressed) return true;
			}
		}

		return false;
	}

	return scope;
}