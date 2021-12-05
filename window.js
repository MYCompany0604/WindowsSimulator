
var MouseButton = 0;
var LayerName = '';
var TopItem = 100;
var LastActive = 'NA';
var OutX;
var OutY;
var where = ""; // which link
var CurX;
var CurY;

function fActiveLayer(lName) {
	
		
	TopItem = TopItem + 1;
	document.getElementById(lName).style.zIndex = TopItem;
	
	LastActive = lName
}


function fMoveMouse(e) {

		if (document.layers) {
			CurX = e.x;
			CurY = e.y;
		}
		else if (document.all) {
			CurX = event.clientX;
			CurY = event.clientY;
		}
		else if (document.getElementById) {
			CurX = e.clientX;
			CurY = e.clientY;
		}
		
		CurX = parseInt(CurX);
		CurY = parseInt(CurY);
		
	if (MouseButton == 1) {

		var StartX = 0;
		var StartY = 0;
		var StartW = 0;
		var StartH = 0;
		
		var old_x = 0;
		var old_y = 0;
		var old_W = 0;
		var old_H = 0;
		
		var actual_width = 0;
		var actual_height = 0;
		
		var didH = 0;
		var didW = 0;
		
		OldX = document.getElementById(LayerName).dMouseStartX;
		OldY = document.getElementById(LayerName).dMouseStartY;
		
		dToDo = parseInt(document.getElementById(LayerName).dToDo);
		
		if (dToDo == 1) {
			StartX = document.getElementById(LayerName).dStartPosX;
			StartY = document.getElementById(LayerName).dStartPosY;
			
			TargetX = StartX + (CurX - OldX);
			TargetY = StartY + (CurY - OldY);
			
			//if (TargetX < 0) TargetX = 0;
			//if (TargetY < 0) TargetY = 0;
		
			document.getElementById(LayerName).style.left = TargetX;
			document.getElementById(LayerName).style.top = TargetY;
		}
		
		if (dToDo >= 2) {
			
			StartX = parseInt(document.getElementById(LayerName).dStartPosX);
			StartY = parseInt(document.getElementById(LayerName).dStartPosY);
			StartW = parseInt(document.getElementById(LayerName).dStartWidth);
			StartH = parseInt(document.getElementById(LayerName).dStartHeight);
			
			TargetX = StartX;
			TargetY = StartY;
			TargetW = StartW;
			TargetH = StartH;
			
			if (dToDo-16 >= 0) {
				dToDo = dToDo - 16
				TargetW = StartW - (CurX - OldX);
				
				if (TargetW >= 0) { document.getElementById(LayerName).style.width = TargetW; }
				var CurW = parseInt(document.getElementById(LayerName).offsetWidth);
				didW = 1;
				
				TargetX = StartX + (StartW - CurW);
			}
			
			if (dToDo-8 >= 0) {
				dToDo = dToDo - 8
				TargetH = StartH + (CurY - OldY);
			}
			
			if (dToDo-4 >= 0) {
				dToDo = dToDo - 4
				TargetW = StartW + (CurX - OldX);
			}
			
			if (dToDo-2 >= 0) {
				dToDo = dToDo - 2
				TargetH = StartH - (CurY - OldY);
				if (TargetH >= 0) { document.getElementById(LayerName).style.height = TargetH; }
				var CurH = parseInt(document.getElementById(LayerName).offsetHeight);
				didH = 1;
					
				TargetY = StartY + (StartH-CurH);
			}
			
			
			document.getElementById(LayerName).style.left = TargetX;
			document.getElementById(LayerName).style.top = TargetY;
			if ((TargetW >= 0) && (didW == 0)) { document.getElementById(LayerName).style.width = TargetW; }
			if ((TargetH >= 0) && (didH == 0)) { document.getElementById(LayerName).style.height = TargetH; }
			
		}
	}
	
}

function fMouseUp() {
	MouseButton = 0;
	LayerName = '';
}

function fMouseDown(lName, ToDo) {   //ToDo: 1 = Move, 2 = Resize Top,  4 = Resize Right, 8 = Resize Bottom, 16 = Resize Left    ie. 18 = Resize Top/Left ;;;;
	MouseButton = 1;
	LayerName = lName;
	
	document.getElementById(LayerName).dToDo = ToDo;
	
	document.getElementById(LayerName).dMouseStartX = CurX;  //  parseInt(GetMouseX()); //window.event.clientX;
	document.getElementById(LayerName).dMouseStartY = CurY;  // parseInt(GetMouseY()); // window.event.clientY;	

	document.getElementById(LayerName).dStartPosX = parseInt(document.getElementById(LayerName).style.left);
	document.getElementById(LayerName).dStartPosY = parseInt(document.getElementById(LayerName).style.top);

	document.getElementById(LayerName).dStartWidth = parseInt(document.getElementById(LayerName).offsetWidth);
	document.getElementById(LayerName).dStartHeight = parseInt(document.getElementById(LayerName).offsetHeight);
	
	//alert(ToDo);
	
}


function fCloseWindow(lName) {
	document.getElementById(lName).style.visibility = 'hidden';
}


function fShowWindow(lName) {
	fActiveLayer(lName);
	document.getElementById(lName).style.visibility = 'visible';
}

function fNull() {
	return false;
}

document.onmousemove = fMoveMouse;
//if(navigator.appName == "Microsoft Internet Explorer") {document.captureEvents(Event.MOUSEMOVE);}
