
var dDownOnBtnId = '';
var showStr = '0';
var Total = 0;
var Memory = 0;
var Action = ' ';
var lastAction = ' ';
var clrShowStr = false;
var lastNumber = false;

clearDisplay()
doOutput();

function doOutput() {
	document.getElementById('textBox').value = showStr + " " + Action;
}

function doBtnDown(BtnId) {
	document.getElementById(BtnId).style.borderStyle = 'inset';
	dDownOnBtnId = BtnId;
}

// --------------- clearDispaly ---------------

function clearDisplay() {
	showStr = '0';
	Action = ' ';
}

function doBtnUp(BtnId) {
	
	// --------------- SubFunction doCalc ---------------
	
	function doCalc(func) {
		
		Action = func;
		showInt = parseFloat(showStr);
		OldTotal = Total;
		
		if (lastNumber) {
			if ((lastAction == ' ') & (showInt != 0)) { Total = showInt; }
			
			if (lastAction == '+') { Total = Total + showInt; }
			if (lastAction == '-') { Total = Total - showInt; }
			if (lastAction == '*') { Total = Total * showInt; }
			if (lastAction == '÷') { Total = Total / showInt; }
			
		}
		
		if (Action == '=') { Action = ' '; }
		
		showStr = Total;
		clrShowStr = true;
		
		lastAction = Action;
	
	}
		
	// --------------- Code ---------------
	
	if (BtnId == dDownOnBtnId) {
		
		ds = false;
		clrShowStr = false;
		BtnStr = BtnId.substr(1, BtnId.length);
		BtnInt = parseFloat(BtnStr);
		showInt = parseFloat(showStr);
		
		if (BtnStr == 'BS') {
			showStrLen = showStr.length - 1;
			showStr = showStr.substr(0, showStrLen);
			ds = true;
		}
		
		if (BtnStr == 'CE') {
			clearDisplay();
			lastAction = ' ';
			Total = 0;
			ds = true;
		}
		
		if (BtnStr == 'C') {
			showStr = '0';
			ds = true;
		}

		if ((BtnStr == '.') & (showStr == '0')) {
			showStr = '0.';
			ds = true;
		}
		
		if (BtnStr == '+-') {
			showStr = -showInt;
			Action = lastAction;
			lastNumber = true;
			
			BtnStr = '';	
		}
		
		if (BtnStr == 'Sqr') {
			if (showInt > 0) {
				showStr = Math.sqrt(showInt);
			}
			else
			{
				alert('Cannot get square root of a negative number or zero.');
			}
			
			ds = true;
		}

		if (BtnStr == 'x') { 
			showStr = 1 / showInt;
			ds = true;
		}
		
		if (BtnStr == '+') {
			doCalc('+');
			ds = true;
		}
		
		if (BtnStr == '-') {
			doCalc('-');
			ds = true;
		}
		
		if (BtnStr == '*') {
			doCalc('*');
			ds = true;
		}
		
		if (BtnStr == '/') {
			doCalc('÷');
			ds = true;
		}
		
		if (BtnStr == '=') {
			doCalc('=');
			ds = true;
		}
		
		if (BtnStr == '%') {
			showStr = Total * (showInt/100);
			Action = lastAction;
			lastNumber = true;
			
			BtnStr = '';
		}
				
		if (BtnStr == "M+") {
			if (showStr != '0') {
				Memory = Memory + showInt;
				document.getElementById('MemStat').innerHTML = 'M';
			}
			
			ds = true;
		}
		
		if (BtnStr == "MS") {
			Memory = showInt;
			document.getElementById('MemStat').innerHTML = 'M';
			ds = true;
		}
		
		if (BtnStr == "MR") {
			if (Memory != 0) { showStr = Memory; }
			ds = true;
		}
		
		if (BtnStr == "MC") {
			document.getElementById('MemStat').innerHTML = '&nbsp;';
			Memory = 0;
			ds = true;
		}
		
		
		//---------------------------------------------
		
		if (!ds) {
			if (showStr == '0') { showStr = ''; }
			if (showStr.length < 20) { showStr = showStr + BtnStr; }
			lastNumber = true;
		}
		else {
			lastNumber = false;
		}
		
		
		if (showStr == '') { showStr = '0'; }
		
		doOutput();
		if (clrShowStr) { clearDisplay(); }

		doBtnReset(BtnId);
	}
	
}

function doBtnReset(BtnId) {
	document.getElementById(BtnId).style.borderStyle = 'outset';
	dDownOnBtnId = '';
}

function doKeyPress() {
	
	dk = false;
	
	inCode = event.keyCode;
	inShift = event.shiftKey;
	inStr = String.fromCharCode(inCode);
	inInt = parseFloat(inStr);
	
	outBtn = inStr;
	
	if (inCode == 8) { outBtn = 'BS'; dk = true; } // Backspace
	if (inCode == 13) { outBtn = '='; dk = true; } // Enter
	if (inCode == 27) { outBtn = 'CE'; dk = true; } // Escape
	if (inCode == 107) { outBtn = '+'; dk = true; } // +
	if ((inCode == 109) || (inCode == 189)) { outBtn = '-'; dk = true; } // -
	if (inCode == 106) { outBtn = '*'; dk = true; } // *
	if ((inCode == 111) || (inCode == 191)) { outBtn = '÷'; dk = true; } // /
	if (inCode == 187) { outBtn = '='; dk = true; } // =
	if ((inCode == 110) || (inCode == 190)) { outBtn = '.'; dk = true; } // .
	
	if ((inShift) & (inCode == 187)) { outBtn = '+'; dk = true; } // Shift + =
	if ((inShift) & (inInt == 8)) { outBtn = '*'; dk = true; } // Shift + 8
	if ((inShift) & (inInt == 5)) { outBtn = '%'; dk = true; } // Shift + 5
	
	if ((inCode >= 96) & (inCode <= 105)) { outBtn = (inCode - 96); dk = true; }
	
	outBtn = 'b' + outBtn;
	if ((inStr == inInt) || (dk)) { dDownOnBtnId = outBtn; doBtnUp(outBtn);}
	
}