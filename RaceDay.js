var white ='#FFFFFF';
var grey  ='#EEEEEE';
var blue  ='#0000FF';
var green ='#00FF00';
var yellow='#FFFF00';
var red   ='#FF0000';
var prevColor=grey;
var prevPlace=0;
var currentHeatIndex = 0;
var racers = new Array();
var heats = new Array();
var save_lanes_html;
var dbg=false;
var points_mode=false;

var showingRosterAs = 'standings';

var generators = new Array();
generators[4] = '1,1,1';
generators[5] = '1,1,1';
generators[6] = '1,1,1,2,3,4';
generators[7] = '1,1,1';
generators[8] = '1,1,1,2,3,4;1,1,1,2,4,5;1,1,1,3,4,5;1,1,2,3,4,5;1,2,2,3,4,5';
generators[9] = '1,1,1,2,3,5';
generators[10] = '1,1,1,2,3,4;1,1,1,2,3,6;1,1,1,2,4,5;1,1,1,2,5,6;1,1,1,3,4,5;1,1,1,3,5,6;1,1,1,4,5,6;1,1,2,3,4,5;1,1,2,3,5,6;1,1,2,4,5,6';
generators[11] = '1,1,1,2,3,4;1,1,1,2,4,6;1,1,1,3,4,5;1,1,1,3,4,6;1,1,2,3,4,5;1,1,2,3,4,6;1,2,2,3,4,5;1,2,2,3,4,6';
generators[12] = '1,2,3,4,5,6;1,2,3,4,6,7;1,2,4,5,6,7';
generators[13] = '1,2,3,4,5,6;1,2,3,4,5,7';
generators[14] = '1,2,3,4,5,7;1,2,3,4,6,7;1,2,3,4,7,8;1,2,3,5,6,7;1,2,4,5,6,7;1,2,4,5,7,8;1,3,4,5,7,8';
generators[15] = '1,2,3,4,5,7;1,2,3,4,5,8;1,2,3,4,6,7;1,2,3,4,6,8;1,2,3,5,6,7;1,2,3,5,6,8;1,2,4,5,6,7;1,2,4,5,6,8;1,3,4,5,6,7';
generators[16] = '1,2,3,4,5,8;1,2,3,4,7,8;1,2,3,4,8,9;1,2,3,5,7,8;1,2,4,5,6,8;1,2,4,5,7,8;1,2,4,5,8,9;1,2,4,6,7,8;1,3,4,5,6,7;1,3,4,5,6,8;1,3,5,6,8,9';
generators[17] = '1,2,3,4,5,7;1,2,3,4,6,8;1,2,3,4,6,9;1,2,3,4,7,8;1,2,3,4,7,9;1,2,3,5,7,9;1,2,3,6,7,8;1,2,3,6,7,9;1,2,4,5,6,8;1,2,4,5,6,9;1,2,4,5,7,8;1,2,4,5,7,9;1,2,4,6,7,9;1,2,5,6,7,8;1,2,5,6,7,9;1,3,4,5,6,8;1,3,4,5,6,9;1,3,5,6,7,8';
generators[18] = '1,2,4,5,8,9;1,2,4,5,9,10;1,2,4,6,8,9;1,2,5,6,7,9;1,2,5,6,8,9;1,3,4,5,6,9;1,3,4,5,7,9;1,3,4,6,7,9;1,3,5,6,7,9';
generators[19] = '1,2,3,4,7,10;1,2,3,4,7,9;1,2,3,4,8,10;1,2,3,4,8,9;1,2,3,7,8,10;1,2,3,7,8,9;1,2,4,5,6,10;1,2,4,5,6,9;1,2,4,5,8,10;1,2,4,5,8,9;1,2,4,6,8,10;1,2,4,6,8,9;1,2,4,7,8,9;1,2,5,6,7,10;1,2,5,6,8,9;1,2,5,7,8,10;1,2,6,7,8,9;1,3,4,5,6,10;1,3,4,5,8,9;1,3,4,6,8,9;1,3,5,6,7,10;1,3,5,6,7,8;1,3,6,7,8,9';
generators[20] = '1,2,5,6,10,11;1,2,5,7,9,10;1,3,6,7,8,10';
generators[21] = '1,2,3,8,9,11;1,2,5,6,9,10;1,2,5,8,9,10;1,3,5,6,7,10;1,3,5,6,8,11;1,3,5,7,8,11;1,3,6,7,8,11';
generators[22] = '1,3,7,8,9,11';
generators[23] = '1,3,5,6,10,11;1,3,5,6,7,12;1,3,5,7,10,11';
generators[24] = '1,2,4,9,10,13;1,3,6,7,8,11;1,3,6,7,9,13';
generators[25] = '1,2,4,9,11,13;1,2,5,10,11,13;1,2,5,6,10,11;1,2,5,6,10,13;1,2,5,6,9,12;1,2,5,9,10,11;1,3,5,6,7,10;1,3,5,8,10,13;1,3,5,9,10,13;1,3,6,7,10,13;1,3,6,7,11,12;1,3,6,7,8,12;1,3,6,9,11,12;1,3,8,9,10,13;1,4,7,8,9,10';
generators[26] = '1,3,6,7,11,13;1,3,6,7,8,13';
generators[27] = '1,3,6,7,12,13;1,3,6,7,8,14;1,4,7,9,10,14';
generators[28] = '2,3,7,8,14,15;2,3,7,9,13,14;2,3,9,10,11,13';
generators[29] = '1,3,7,8,12,15;1,3,7,8,9,14;1,4,6,7,8,12;1,4,6,9,12,15;1,4,7,10,13,14';
generators[30] = '1,2,5,10,11,13;1,3,6,7,11,14;1,3,6,7,12,13;1,3,6,7,12,16;1,4,7,9,13,14;1,4,8,10,11,16;1,4,8,9,10,14;1,4,8,9,11,16;1,5,8,10,11,12;1,5,8,9,11,12';
generators[31] = '1,2,5,10,12,13;1,2,5,10,12,15;1,2,5,6,9,12;1,2,7,11,12,13;1,2,7,11,12,14;1,2,7,12,13,14;1,2,9,10,13,14;1,3,5,12,13,16;1,3,6,7,11,15;1,3,6,7,8,11';
generators[32] = '1,2,4,5,8,10;1,2,4,5,8,9;1,2,4,5,9,10;1,2,4,8,9,10;1,2,5,10,13,15;1,2,5,6,9,13;1,2,7,11,13,14;1,3,5,12,13,17;1,3,6,7,12,15;1,3,6,7,13,14';
generators[33] = '1,2,4,5,8,11;1,2,4,5,8,9;1,2,4,5,9,11;1,2,4,8,9,11;1,2,5,10,11,16;1,2,5,10,12,15;1,2,5,10,12,17;1,2,5,10,14,15;1,2,5,6,11,12;1,2,5,6,9,14';
generators[34] = '1,2,4,5,10,11;1,2,4,5,8,10;1,2,4,5,8,11;1,2,4,5,8,12;1,2,4,5,9,12;1,2,4,8,10,11;1,2,5,10,13,15;1,2,5,9,10,11;1,2,6,11,13,14;1,2,8,9,12,18';
generators[35] = '1,2,4,5,10,11;1,2,4,5,10,12;1,2,4,5,8,10;1,2,4,5,8,12;1,2,4,5,9,10;1,2,4,5,9,11;1,2,4,8,10,12;1,2,4,9,10,11;1,2,5,6,11,14;1,2,5,6,9,16';
generators[36] = '1,2,4,5,10,12;1,2,4,5,11,12;1,2,4,5,8,11;1,2,4,5,8,12;1,2,4,5,8,9;1,2,4,5,9,10;1,2,4,5,9,12;1,2,4,8,11,12;1,2,4,8,9,14;1,2,4,9,10,12';
generators[37] = '1,2,4,5,10,13;1,2,4,5,8,10;1,2,4,5,8,14;1,2,4,5,8,15;1,2,4,5,8,9;1,2,4,5,9,10;1,2,4,5,9,11;1,2,4,5,9,12;1,2,4,5,9,13;1,2,4,5,9,15';
generators[38] = '1,2,4,5,10,11;1,2,4,5,10,12;1,2,4,5,11,12;1,2,4,5,8,10;1,2,4,5,8,14;1,2,4,5,8,16;1,2,4,5,8,9;1,2,4,5,9,11;1,2,4,5,9,13;1,2,4,5,9,16';
generators[39] = '1,2,4,5,8,10;1,2,4,5,8,11;1,2,4,5,8,12;1,2,4,5,8,14;1,2,4,5,8,15;1,2,4,5,8,16;1,2,4,5,8,17;1,2,4,5,9,10;1,2,4,5,9,12;1,2,4,5,9,13';
generators[40] = '1,2,4,5,8,10;1,2,4,5,8,11;1,2,4,5,8,15;1,2,4,5,8,17;1,2,4,5,8,18;1,2,4,5,8,9;1,2,4,5,9,10;1,2,4,5,9,15;1,2,4,5,9,16;1,2,4,5,9,18';
generators[41] = '1,2,4,5,8,11;1,2,4,5,8,12;1,2,4,5,8,16;1,2,4,5,8,17;1,2,4,5,8,18;1,2,4,5,8,19;1,2,4,5,8,9;1,2,4,5,9,10;1,2,4,5,9,11;1,2,4,5,9,12';
generators[42] = '1,2,4,5,8,10;1,2,4,5,8,11;1,2,4,5,8,12;1,2,4,5,8,14;1,2,4,5,8,15;1,2,4,5,8,18;1,2,4,5,8,19;1,2,4,5,8,20;1,2,4,5,8,9;1,2,4,5,9,10';
generators[43] = '1,2,4,5,8,10;1,2,4,5,8,12;1,2,4,5,8,14;1,2,4,5,8,16;1,2,4,5,8,18;1,2,4,5,8,19;1,2,4,5,8,20;1,2,4,5,8,21;1,2,4,5,8,9;1,2,4,5,9,11';
generators[44] = '1,2,4,5,8,10;1,2,4,5,8,11;1,2,4,5,8,12;1,2,4,5,8,15;1,2,4,5,8,16;1,2,4,5,8,17;1,2,4,5,8,19;1,2,4,5,8,20;1,2,4,5,8,21;1,2,4,5,9,10';
generators[45] = '1,2,4,5,8,10;1,2,4,5,8,11;1,2,4,5,8,14;1,2,4,5,8,15;1,2,4,5,8,17;1,2,4,5,8,18;1,2,4,5,8,20;1,2,4,5,8,21;1,2,4,5,8,22;1,2,4,5,8,9';
generators[46] = '1,2,4,5,8,11;1,2,4,5,8,12;1,2,4,5,8,14;1,2,4,5,8,16;1,2,4,5,8,17;1,2,4,5,8,18;1,2,4,5,8,21;1,2,4,5,8,22;1,2,4,5,8,24;1,2,4,5,8,9';
generators[47] = '1,2,4,5,8,10;1,2,4,5,8,11;1,2,4,5,8,12;1,2,4,5,8,14;1,2,4,5,8,15;1,2,4,5,8,16;1,2,4,5,8,18;1,2,4,5,8,19;1,2,4,5,8,20;1,2,4,5,8,9';
generators[48] = '1,2,4,5,8,10;1,2,4,5,8,12;1,2,4,5,8,14;1,2,4,5,8,15;1,2,4,5,8,17;1,2,4,5,8,18;1,2,4,5,8,19;1,2,4,5,8,21;1,2,4,5,8,23;1,2,4,5,8,9';
generators[49] = '1,2,4,5,8,10;1,2,4,5,8,11;1,2,4,5,8,12;1,2,4,5,8,15;1,2,4,5,8,16;1,2,4,5,8,17;1,2,4,5,8,19;1,2,4,5,8,20;1,2,4,5,8,21;1,2,4,5,8,9';
generators[50] = '1,2,4,5,8,10;1,2,4,5,8,11;1,2,4,5,8,14;1,2,4,5,8,15;1,2,4,5,8,16;1,2,4,5,8,18;1,2,4,5,8,19;1,2,4,5,8,20;1,2,4,5,8,22;1,2,4,5,8,9';


function todo() {
   alert('Not yet implemented!');
}

function eraseAll() {
   if (confirm("Do you really want to erase everything?")) {
      localStorage.clear();
      initStuff();
   }
}

function initStuff() {
   if (window.File &&     window.FileReader && 
       window.FileList && window.Blob) {
      //alert('File reading OK');
   } else {
      alert('The File APIs are not fully supported by your browser.');
   }

   var pw = window.innerWidth;
   var ph = window.innerHeight;
   document.getElementById('right_header').style.height = 60
   var lh = (ph-100)/4;
   //alert("size: "+ph+"x"+pw+"-->"+lh);

   for (var i=0; i<4; i++) {
      var anid='lane'+i;
      colorIt(anid,grey);
      anid = anid+'_place';
      document.getElementById(anid).innerHTML = '*';
      document.getElementById(anid).style.height = lh;
   }
   //alert("OK");

   document.getElementById('heatTogether').checked = 1;

   // Setup the dnd listeners.
   var dropZone = document.getElementById('drop_zone');
   dropZone.addEventListener('dragover', handleDragOver, false);
   dropZone.addEventListener('drop', handleFileSelect, false);

   dbg = false;
   points_mode=false;

   // check whether we have previous racing data saved off
   if ('EVERYTHING' in localStorage) {
      if(dbg) { alert("localStorage has 'EVERYTHING'");}
      var csv = localStorage.getItem('EVERYTHING');
      if (dbg) { alert(csv); }
      parseCsv(csv);
   } else {
      if (dbg) { alert("localStorage does not have 'EVERYTHING'"); }
   }
}

function toggleDebug() {
   dbg = !dbg;
   if (dbg) {
      alert("Debugging alerts activated");
   }
}


function readFile(f) {
   var reader = new FileReader();
   reader.onload = (function(f) {
      return function(e) {
         var contents = e.target.result;
         parseCsv(contents);
      };
   })(f);

   reader.readAsText(f);
}

function handleFileSelect(evt) {
   evt.stopPropagation();
   evt.preventDefault();
   //alert(evt.dataTransfer);
   var files = evt.dataTransfer.files; // FileList object.
   //alert("Dumpty" + evt.dataTransfer.files.length);
   for (var i=0, f; f=files[i]; i++) {
      readFile(f);
   }
}

function handleDragOver(evt) {
   evt.stopPropagation();
   evt.preventDefault();
   evt.dataTransfer.dropEffect = 'copy'; // Explicitly show this is a copy.
}

function groupOfNum(num) {
   var td = num % 100;
   if (td < 25) { return 'A' }
   if (td < 50) { return 'B' }
   if (td < 75) { return 'C' }
   if (td < 90) { return 'D' }
   return 'E';
}

function parseCsv(csv) {
   if (dbg) alert("Entering parseCsv()");
   var lines = csv.split("\n");
   if (dbg) alert("Input split into lines: "+lines.length);
   var countNewRacers=0;
   var countNewHeats=0;

   for (var i=0; i<lines.length; i++) {
      var l = lines[i];
      if (dbg) alert("Line "+i+": "+l);
      var words = l.replace(/\"/g, '').split(',');
      //alert(words);
      var linetype = words.shift();
      if (linetype == 'RACER_HEAD') {

      } else if (linetype == 'HEAT_HEAD') {

      } else if (linetype == 'HEAT') {
	 countNewHeats++;
	 var h = new Object();
	 h.n = words.shift();  // heat id number
	 h.nr = words.shift(); // #racers in heat

	 h.racers = new Array();
	 for (var j=0; j<h.nr; j++) { h.racers.push(words.shift()) }

	 h.places = new Array();
	 for (var j=0; j<h.nr; j++) { 
	     h.places.push(words.shift());
	     if (parseInt(h.places[j]) > 4) {
		 points_mode = true;
	     }
	 }

	 heats.push(h);
      } else if (linetype == 'RACER') {
	 countNewRacers++;
	 var r = new Object();
	 r.n     = words.shift();
	 r.g     = groupOfNum(r.n);
	 r.first = words.shift();
	 r.last  = words.shift();
	 racers.push(r);
      } else { // no keyword, this is a google-doc download
         var r = new Object();
         r.n = linetype;
         r.g = words.shift();
         r.first = words.shift();
         if (!r.first || r.first == 'First' || r.first == "Don't") { continue; }
         if (r.g != groupOfNum(r.n)) {
            alert("Racer "+r.n+" should be in group "+
		  groupOfNum(r.n)+" not "+r.g);
         }
         r.last  = words.shift();
         racers.push(r);
         countNewRacers++;
      }
   }

   var gary = getAllGroups();

   for (var i=0; i<racers.length; i++) {
      var rgbstr = '#';
      for (var j=0; j<6; j++) {
	 rgbstr += dig2hex(8+Math.floor(Math.random()*8));
      }
      racers[i].rgbstr = rgbstr;
      //if (i<5) alert(rgbstr);
   }
   
   var msg = "Imported:"
      + "\n  Racers: " + countNewRacers 
      + "\n  Groups:";
   for (var gi=0; gi<gary.length; gi++) {
      var rnums = getRacerNumsForGroup(gary[gi]);
      msg += "\n    "+gary[gi]+": "+rnums.length;
   }
   msg += "\n  Heats:  " + countNewHeats;

   alert(msg);

   currentHeatIndex = 0;
   prevPlace = 0;
   displayAll();
}

function colorIt(id,color) {
   document.getElementById(id).style.backgroundColor = color;
}

function colorOfPlace(p) {
   var numba = parseInt(p);
   switch (numba) {
   case 1: return blue;
   case 2: return green;
   case 3: return yellow;
   case 4: return red;
   default: return grey;
   }
}

function char2num(c) {
   if (parseInt(c)) { return parseInt(c);}
   if (c == 'a') { return 1; }
   if (c == 'b') { return 2; }
   if (c == 'c') { return 3; }
   if (c == 'd') { return 4; }
   if (c == 'e') { return 5; }
   if (c == 'f') { return 6; }
   if (c == 'g') { return 7; }
   if (c == 'h') { return 8; }
   if (c == 'i') { return 9; }
   if (c == 'j') { return 10; }
   if (c == 'k') { return 11; }
   if (c == 'l') { return 12; }
   if (c == 'm') { return 13; }
   if (c == 'n') { return 14; }
   if (c == 'o') { return 15; }
   if (c == 'p') { return 16; }
   if (c == 'q') { return 17; }
   if (c == 'r') { return 18; }
   if (c == 's') { return 19; }
   if (c == 't') { return 20; }
   if (c == 'u') { return 21; }
   if (c == 'v') { return 22; }
   if (c == 'w') { return 23; }
   if (c == 'x') { return 24; }
   if (c == 'y') { return 25; }
   if (c == 'z') { return 26; }
   return 0;
}

function str2num (str) {
   var num=0;
   for (var i=0; i<str.length; ++i) {
      num += char2num(str[i]);
   }
   return num;
}

function dig2hex(d) {
   if (d<10)  { return d   }
   if (d==10) { return 'A' }
   if (d==11) { return 'B' }
   if (d==12) { return 'C' }
   if (d==13) { return 'D' }
   if (d==14) { return 'E' }
   if (d==15) { return 'F' }
}


function str2clr(str) {
   var num = str2num(str);
   var rgbstr = '#';
   rgbstr += dig2hex(8+(num)     % 8);
   rgbstr += dig2hex(8+(num*num) % 8);
   rgbstr += dig2hex(8+(num*num-num) % 8);
   rgbstr += dig2hex(8+(num*num+num) % 8);
   rgbstr += dig2hex(8+(num*num*num - num) % 8);
   rgbstr += dig2hex(8+(num*num*num + num) % 8);
   //alert (str+"->"+rgbstr);
   return rgbstr;
}

function racerLabel(r) {
   return ( r.n + ': ' + r.first + ' ' + r.last );
}

function racerNum(num) {
   for (var i=0; i<racers.length; i++) {
      if (parseInt(racers[i].n) == parseInt(num)) {
	 return racers[i];
      }
   }
}

function heatNum(num) {
   return heats[heatIndex(num)];
}

function heatIndex(num) {
   for (var i=0,h; h=heats[i]; i++) {
      if (parseInt(h.n) == parseInt(num)) {
	 return i;
      }
   }
}

function enterPoints(id) {
    var pointstr = prompt("Enter Points:");
    var points = parseInt(pointstr);
    var place_id = id+'_place';
    document.getElementById(place_id).innerHTML = points;

    var islane=/^lane\d+$/;
    if (islane.test(id)) {
	var lanenum = /\d+$/;
	var i = lanenum.exec(id);
	heats[currentHeatIndex].places[i] = points;
    }
}

function nextPlace(id) {
   if (dbg) alert("Entering nextPlace("+id+")");
   var newPlace = prevPlace+1;
   var nracers = heats[currentHeatIndex].nr;
   if (newPlace > nracers) { newPlace = 0; }
   prevPlace = newPlace;
   var place_id = id+'_place';
   document.getElementById(place_id).innerHTML = newPlace;

   var islane=/^lane\d+$/;
   if (islane.test(id)) {
      var lanenum = /\d+$/;
      var i = lanenum.exec(id);
      heats[currentHeatIndex].places[i] = newPlace;
   }
}

function displayOnDeck() {
   var hi = currentHeatIndex + 1;
   if (dbg) alert("Entering displayOnDeck("+hi+")");
   if (hi >= heats.length) {
      // no next heat; clear the decks!
      for (var i=0; i<heats[0].nr; ++i) {
	 document.getElementById('ondeck'+i).innerHTML = '-';
      }
   } else {
      for (var i=0; i<heats[hi].nr; ++i) {
	 var lbl = racerLabel(racerNum(heats[hi].racers[i]));
	 document.getElementById('ondeck'+i).innerHTML = lbl;
      }
   }
}

function displayHeat() {
   var hi = currentHeatIndex;
   var h  = heats[hi];
   if (dbg) alert("displayHeat: heat index "+hi+" is heat number "+h.n);

   var nlanes = h.racers.length;
   //alert("I got " + nlanes + " lanes: "+h.racers);
   var pw = window.innerWidth;
   var ph = window.innerHeight;
   document.getElementById('right_header').style.height = 60;
   var lh = (ph-100)/4;

   for (var i=0; i<nlanes; i++) {
      // Populate the racer label for this lane
      var rid = 'lane' + i + '_racer';
      var lbl = racerLabel(racerNum(h.racers[i]));
      document.getElementById(rid).innerHTML = 
	 '<h1>'+lbl+'</h1>';
      
      // populate the place label for this lane
      var pid = 'lane' + i + '_place';
      lbl = (h.places[i] < 0 ? '*' : '<h1>'+h.places[i]+'</h1>');
      document.getElementById(pid).innerHTML = lbl;

      // color this lane according to place
      if (!points_mode) {
	  var c = colorOfPlace(h.places[i]);
	  var lid = 'lane' + i;
	  colorIt(lid, c);
	  document.getElementById(lid).style.height = lh;
      }
   }

   if (points_mode) {
       var ptsary = new Array();
       for (var i=0; i<nlanes; i++) { ptsary.push( h.places[i] ); }
       ptsary.sort(function(a,b){return b-a});
       for (var i=0; i<nlanes; i++) {
	   var c;
	   if (h.places[i] < 0) {
	       c = colorOfPlace(-1);
	   } else {
	       for (var place=nlanes; place>0; place--) {
		   if (h.places[i] == ptsary[place-1]) {
		       c = colorOfPlace(place);
		   }
	       }
	   }
	   var lid = 'lane' + i;
	   colorIt(lid, c);
	   document.getElementById(lid).style.height = lh;
       }
       
   }

   document.getElementById('currentHeatNumber').innerHTML = 'HEAT '+h.n;
}

function heatHasNoPlaces(hi) {
   var h = heats[hi];
   var max_num = (points_mode ? 60 : h.nr);
   for (var lane=0; lane<h.nr; lane++) {
      var place = h.places[lane];
      if (place >= 0 && place <= max_num) {
	 return false;
      }
   }
   return true;
}

function heatHasAllPlaces(hi) {
   var h = heats[hi];
   var nr = h.nr;

    if (points_mode) {
	for (var j=0; j<nr; j++) { // does racer j have no score?
            if (parseInt(h.places[j]) < 0) {
		return false;
            }
	}
    } else {
	for (var i=1; i<=nr; i++) {
	    var missing_place_i = true; // as far as we know
	    for (var j=0; j<nr; j++) {
		if (parseInt(h.places[j]) == parseInt(i)) {
		    missing_place_i = false;
		}
	    }
	    if (missing_place_i) { 
		return false; // only partly populated
	    }
	}
    }
    return true; // fully populated
}

function heatIsPartlyPopulated(hi) {
   return (!heatHasNoPlaces(hi) && !heatHasAllPlaces(hi));
}

function racerIsNext(id) {
   if (dbg) alert("Entering racerIsNext("+id+")");

   if (heatHasAllPlaces(currentHeatIndex)) {
      if (confirm("Heat "+heats[currentHeatIndex].n+
		  " already has place data for all lanes.\n\n"+
		  "Do you want to clear the heat and re-enter place data?")) {
	 clearHeat();
	 displayHeat();
      }
      return;
   }

   if (points_mode) {
       enterPoints(id)
   } else {
       nextPlace(id);
   }
   displayHeat();
   displayRoster();
}

function prevHeat() {
   if (dbg) alert("Entering prevHeat()");
   if (currentHeatIndex <= 0) {
      return; // there is no previous!
   }

   if (heatIsPartlyPopulated(currentHeatIndex)) {
      if (confirm("Heat "+heats[currentHeatIndex].n+" is not fully populated.\n\n"+
		  "Click OK to erase current heat and proceed to previous heat.\n"+
                  "Or Click Cancel to finish populating current heat.")) {
	 clearHeat();
      } else {
	 return;
      }
   }

   currentHeatIndex--;
   displayHeat();
   displayOnDeck();
   prevPlace = 0;
}

function clearHeat() {
   var hi = currentHeatIndex;
   for (var i=0; i<heats[hi].nr; i++) {
      heats[hi].places[i] = -1;
   }
   prevPlace = 0;
   displayHeat();
   displayRoster();
}

function nextHeat() {
   if (dbg) alert("Entering nextHeat()");
   if (currentHeatIndex + 1 >= heats.length) {
      return; // there is no next!
   }

   if (heatIsPartlyPopulated(currentHeatIndex)) {
      if (confirm("Heat "+heats[currentHeatIndex].n+" is not fully populated.\n\n"+
		  "Click OK to erase current heat and proceed to next heat."+
                  "Or Click Cancel to finish populating current heat.")) {
	 clearHeat();
      } else {
	 return;
      }
   }

   currentHeatIndex++;
   displayHeat();
   displayOnDeck();
   prevPlace = 0;
}


function eraseRoster() {
   document.getElementById('roster').innerHTML = '';
}

function placesOfRacer(ri) {
    var places = new Array();
    for (var j=0; j<heats.length; j++) {
       for (var k=0; k<heats[j].nr; k++) {
          var place = parseInt(heats[j].places[k]);
          if (heats[j].racers[k] == racers[ri].n && place >= 0) {
             places.push(place);
          }
       }
    }
    return places;
}

function average(ary) {
   var sum=0.0;
    if (ary.length) {
	for (var i=0; i<ary.length; i++) {
	    sum += ary[i];
	}
	return sum/ary.length;
    } // else
    return 0.0;
}

function displayRosterAsStandings() {
   if (dbg) alert("Entering displayRosterAsStandings()");
   var pw = window.innerWidth;
   document.getElementById('left_panel').style.width = 0.35*pw;

   var str = '<table border="0">';
   for (var i=0; i<racers.length; i++) {
      str += '<tr>';
      str += '<td>' + racers[i].n + '</td>';
      str += '<td>' + racers[i].first + '</td>';
      str += '<td>' + racers[i].last + '</td>';
      var places = placesOfRacer(i);
      if (places.length) {
	  var avg = average(places);
         str += '<td><b>' + avg.toFixed(2) + '</b></td>';
      }
      for (var j=0; j<places.length; j++) {
         str += '<td>' + places[j] + '</td>';
      }
      str += '</tr>';
   }
   str += '</table>';
   document.getElementById('roster').innerHTML = str;
}

function htmlForHeat(hi) {
   var str = '<td>' + heats[hi].n + '</td>';
   for (var j=0; j<heats[hi].nr; j++) {
      var r = racerNum(heats[hi].racers[j]);
      var lbl = racerLabel(r);
      var clr = heatHasAllPlaces(hi)
	 ? white : r.rgbstr; // to-do races get colored
      str += '<td bgcolor="'+clr+'">' + lbl + '</td>';
   }
   return str;
}

function displayRosterAsSchedule() {
   if (dbg) alert("Entering displayRosterAsSchedule()");

   var pw = window.innerWidth;
   document.getElementById('left_panel').style.width = 0.99*pw;
   save_lanes_html = document.getElementById('right_panel').innerHTML;
   document.getElementById('right_panel').innerHTML = '';

   var off = Math.floor(heats.length / 2);
   var odd = heats.length % 2;
   if (odd) { off++ }

   var str = '<table border="1">';
   str += '<tr><td>H</td><td>Lane 1</td><td>Lane 2</td><td>Lane 3</td><td>Lane 4</td>';
   str +=     '<td>H</td><td>Lane 1</td><td>Lane 2</td><td>Lane 3</td><td>Lane 4</td></tr>';

   for (var i=0; i<off; i++) {
      str += '<tr>';

      str += htmlForHeat(i);
      if (i+off < heats.length) {
	 str += htmlForHeat(i+off);
      }

      str += '</tr>';
      //if (i<2) alert(str);
   }

   str += '</table>';
   document.getElementById('roster').innerHTML = str;
}


function displayRosterAsCsv() {
   if (dbg) alert("Entering displayRosterAsCsv()");

   var pw = window.innerWidth;
   document.getElementById('left_panel').style.width = 0.35*pw;
   document.getElementById('right_panel').innerHTML = save_lanes_html;

   var str = '';
   for (var i=0; i<racers.length; i++) {
      var cells = new Array();
      cells.push('RACER');
      cells.push(racers[i].n);
      cells.push(racers[i].first);
      cells.push(racers[i].last);
      var places = placesOfRacer(i);
      if (places.length) {
         var avg = average(places);
         cells.push(avg, places);
      }
      str = str + '<br>' + cells.join(',');
   }


   for (var i=0; i<heats.length; i++) {
      var cells = new Array();
      cells.push('HEAT');
      cells.push(heats[i].n);
      cells.push(heats[i].nr);
      cells.push(heats[i].racers);
      cells.push(heats[i].places);
      str = str + '<br>' + cells.join(',');
   }

   document.getElementById('roster').innerHTML = str;

   localStorage.setItem('EVERYTHING', str.replace(/<br>/g, "\n"));
}

function displayRoster() {
   if (dbg) alert("Entering displayRoster()");
   if        (showingRosterAs == 'standings') {
      displayRosterAsStandings();
   } else if (showingRosterAs == 'schedule') {
      displayRosterAsSchedule();
   } else {// showingRosterAs == 'csv'
      displayRosterAsCsv();
   }
}


function toggleRoster() {
   if      (showingRosterAs == 'standings') showingRosterAs = 'schedule';
   else if (showingRosterAs == 'schedule')  showingRosterAs = 'csv';
   else                                     showingRosterAs = 'standings';

   displayRoster();
}


function arrayContains(ary,val) {
   for (var i=0; i<ary.length; i++) {
      if (ary[i] == val) { return true; }
   }
   return false;
}

function getAllGroups() {
   var gary = new Array();
   for (var i=0; i<racers.length; i++) {
      if (!arrayContains(gary, racers[i].g)) {
	 gary.push(racers[i].g);
      }
   }
   return gary;
}

function getRacerNumsForGroup(g) {
   var rnums = new Array();
   for (var i=0; i<racers.length; i++) {
      if (racers[i].g == g) {
	 rnums.push(racers[i].n);
      }
   }
   return rnums;
}

function verifyMinPerGroup(gary, min) {
   var pass=true;
   for (var gi=0; gi<gary.length;   gi++) {
      var count=0;
      for (var ri=0; ri<racers.length; ri++) {
	 if (racers[ri].g == gary[gi]) count++
      }
      //alert("Group "+gary[gi]+" racers: "+count);
      if (count < min && count > 0) {
	 pass=false;
      }
   }
   return pass;
}


function scrambleRacers() {
   var n = racers.length;
   for (var i=0; i<n; i++) {
      var j = Math.floor(Math.random()*n);
      if (i==j) { continue }
      var swap = racers[i];
      racers[i] = racers[j];
      racers[j] = swap;
   }
   displayRoster();
}


function generatePerfectN(rary, oneortwo) {
   var n = rary.length;
   var gens = generators[n].split(';');
   var geni = Math.floor(Math.random()*gens.length);
   var gen = gens[geni].split(',');
   if (dbg) alert("Generator "+geni+" for "+n+" racers is "+gen);
   if (oneortwo > 1 && gen.length < 6) {
      alert("Don't have double-generators for "+n+" racers");
      return;
   }

   var hi=heats.length + 1;
   for (var s=1; s<=oneortwo; s++) {
      var off = (s > 1 ? 3 : 0);
      for (var i=0; i<n; i++) {
         var h = new Object();
         h.n = hi;
         hi++;
         h.nr = 4;
         h.racers = new Array();
         var ri = i;
         h.racers.push(rary[ri]);
         ri += parseInt(gen[off+0]);
         ri %= n;
         h.racers.push(rary[ri]);
         ri += parseInt(gen[off+1]);
         ri %= n;
         h.racers.push(rary[ri]);
         ri += parseInt(gen[off+2]);
         ri %= n;
         h.racers.push(rary[ri]);
	 //alert(h.racers);

	 h.places = new Array();
	 for (var j=0; j<4; j++) {
 	     h.places.push(-1);
         }
	 
         heats.push(h);
      }
   }
}

function generateHeats(oneortwo) {
   if (heats.length) {
      if (!confirm("Any existing heat/place data will be lost. Generate heats?")) {
	 return;
      }
   }

   var byGroups = 0;
   if (document.getElementById('heatByGroup').checked) {
      byGroups = 1;
   } else if (document.getElementById('heatTogether').checked) {
      byGroups = 0;
   } else {
      alert("Who broke HTML radio buttons?");
   }
   

   if (byGroups) {   
      var gary = getAllGroups();
      //alert("Groups: "+gary);

      if (!verifyMinPerGroup(gary,4)) {
   	 alert("Groups are not big enough; must schedule heats altogether");
   	 return;
      }

      heats = new Array();
      for (var i=0; i<gary.length; i++) {
	 var rary = getRacerNumsForGroup(gary[i]);
	 //alert(gary[i]+": "+rary);
	 generatePerfectN(rary,oneortwo);
      }
   } else {
      var rary = new Array();
      for (var i=0; i<racers.length; i++) {
 	 rary.push(racers[i].n);
      }

      heats = new Array();
      generatePerfectN(rary,oneortwo);
   }
   currentHeatIndex = 0;
   showingRosterAs='schedule';
   displayAll();
}

function displayAll() {
   displayHeat();
   displayOnDeck();
   displayRoster();
}


function togglePointsMode() {
    if (points_mode) {
	points_mode = false;
	alert("Now scoring in PLACE mode");
    } else {
	points_mode = true;
	alert("Now scoring in POINTS mode");
    }
}

raceday.js
