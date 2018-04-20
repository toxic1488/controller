function Controller(){

	var scope = this;

	var focused = false;
	var target_element;
	var actions = {};
	var enabledDevises;


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
				gestures: _action.gestures !== undefined ? _action.gestures : [],
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
		target_element.addEventListener("touchstart", handleTouchStart);
		target_element.addEventListener("touchmove", handleTouchMove);
		target_element.addEventListener("touchend", handleTouchStop);
		target_element.addEventListener("mousedown", mouseTouchStart);
		target_element.addEventListener("mousemove", mouseTouchMove);
		target_element.addEventListener("mouseup", mouseTouchStop);

	}

	scope.detach = function(){
		
		if( target_element!= null) {

			console.log("detach");
			target_element.removeEventListener("keydown", keyDown);
			target_element.removeEventListener("keyup", keyUp);
			target_element.removeEventListener("touchstart", handleTouchStart);
			target_element.removeEventListener("touchmove", handleTouchMove);
			target_element.removeEventListener("touchend", handleTouchStop);
			target_element.removeEventListener("mousedown", mouseTouchStart);
			target_element.removeEventListener("mousemove", mouseTouchMove);
			target_element.removeEventListener("mouseup", mouseTouchStop);
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

					if( _action.enabled && enabledDevises.keyboard){

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

					if( _action.enabled && enabledDevises.keyboard){

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

	var xDown = null;
	var yDown = null;
	var gesture;

	//TOUCH
	function handleTouchStart( event ) {
		xDown = event.touches[0].clientX;
		yDown = event.touches[0].clientY;
	};

	function handleTouchMove( event ) {
		if ( ! xDown || ! yDown ) {
			return;
		}

		var xUp = event.touches[0].clientX;
		var yUp = event.touches[0].clientY;

		var xDiff = xDown - xUp;
		var yDiff = yDown - yUp;

		if ( Math.abs( xDiff ) > Math.abs( yDiff ) ) {

			if ( xDiff > 0 ) {
				//left swipe 
				gesture = "swipe_left";
			} else {
				//right swipe
				gesture = "swipe_right";
			}
		} else {

			if ( yDiff > 0 ) {
				//up swipe 
				gesture = "swipe_up";
			} else {
				//down swipe 
				gesture = "swipe_down";
			}
		}

		for ( var action in actions){

			var _action = actions[action];
			var _gestures = _action.gestures;

			for (var i = 0; i < _gestures.length; i++) {

				if( _gestures[i] == gesture && _action.enabled && enabledDevises.touch){

					_action.is_active = true;

					var gesture_event = new CustomEvent(scope.ACTION_ACTIVATED, {
						detail: {
							action: action
						}
					});

					window.dispatchEvent( gesture_event );
				}
			}
		}

		//reset values
		xDown = null;
		yDown = null;

	};

	function handleTouchStop( event ) {
		var xUp = event.changedTouches[0].clientX;
		var yUp = event.changedTouches[0].clientY;

		for ( var action in actions){

			var _action = actions[action];
			var _gestures = _action.gestures;

			for (var i = 0; i < _gestures.length; i++) {

				if( _gestures[i] == gesture && _action.enabled && enabledDevises.touch){

					_action.is_active = false;

					var gesture_event = new CustomEvent(scope.ACTION_DEACTIVATED, {
						detail: {
							action: action
						}
					});

					window.dispatchEvent( gesture_event );
				}
			}
		}
		gesture = null;

	};

	//MOUSE
	function mouseTouchStart( event ) {
		xDown = event.clientX;
		yDown = event.clientY;
	};

	function mouseTouchMove( event ) {
		if ( ! xDown || ! yDown ) {
			return;
		}

		var xUp = event.clientX;
		var yUp = event.clientY;

		var xDiff = xDown - xUp;
		var yDiff = yDown - yUp;

		if ( Math.abs( xDiff ) > Math.abs( yDiff ) ) {

			if ( xDiff > 0 ) {
				//left swipe 
				gesture = "mouse_swipe_left";
			} else {
				//right swipe
				gesture = "mouse_swipe_right";
			}
		} else {

			if ( yDiff > 0 ) {
				//up swipe 
				gesture = "mouse_swipe_up";
			} else {
				//down swipe 
				gesture = "mouse_swipe_down";
			}
		}

		for ( var action in actions){

			var _action = actions[action];
			var _gestures = _action.gestures;

			for (var i = 0; i < _gestures.length; i++) {

				if( _gestures[i] == gesture && _action.enabled && enabledDevises.mouse){

					_action.is_active = true;

					var gesture_event = new CustomEvent(scope.ACTION_ACTIVATED, {
						detail: {
							action: action
						}
					});

					window.dispatchEvent( gesture_event );
				}
			}
		}

		xDown = null;
		yDown = null;

	};


	function mouseTouchStop( event ) {
		var xUp = event.clientX;
		var yUp = event.clientY;

		for ( var action in actions){

			var _action = actions[action];
			var _gestures = _action.gestures;

			for (var i = 0; i < _gestures.length; i++) {

				if( _gestures[i] == gesture && _action.enabled && enabledDevises.mouse){

					_action.is_active = false;

					var gesture_event = new CustomEvent(scope.ACTION_DEACTIVATED, {
						detail: {
							action: action
						}
					});

					window.dispatchEvent( gesture_event );
				}
			}
		}

		gesture = null;
		xDown = null;
		yDown = null;
	};

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

	scope.setEnabled = function( enables_to_set ){
		enabledDevises = {
			keyboard: enables_to_set.keyboard !== undefined ? enables_to_set.keyboard : true,
			mouse: enables_to_set.mouse !== undefined ? enables_to_set.mouse : true,
			touch: enables_to_set.touch !== undefined ? enables_to_set.touch : true
		}
	}
	return scope;
}