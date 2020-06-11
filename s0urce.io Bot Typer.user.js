// ==UserScript==
// @name            s0urce.io Bot Typer
// @namespace       https://greasyfork.org/scripts/403693-s0urce-io-bot-typer
// @author          anonymous kyb - anonymous.kyb12
// @include         http://s0urce.io/
// @include         http://ioground.com/play/s0urce-io
// @include         http://unblockediogames.com/s0urce-io.html
// @include         http://www.frivgamesunblocked.com/play/s0urceio.html
// @version         4
// @grant           GM_xmlhttpRequest
// @grant           GM_getResourceText
// @grant           GM_getValue
// @grant           GM_setValue
// @grant           unsafeWindow
// @require         https://greasyfork.org/en/scripts/403693-s0urce-io-bot-typer
// @require         https://github.com/anonymous-kyb12/s0urce.io-Bot-Typer
// @description     This script uses a bot to store words that it has already seen you type correctly, then it re-inputs that word again when you stumble upon it. No need to go into the DevTools Console.
// @icon            https://o.remove.bg/uploads/af358ff8-098d-4569-98c1-c417a242a050/s0urce.io.png
// ==/UserScript==

(function() {
    'use strict';
}
/*

{
   "1040837":"url",
   "22217341":"socket",
   "31812199":"getmysqldomain",
   "54611670":"loadloggedpassword",
   "70027981":"removeoldcookie",
   "77901092":"right",
   "104777318":"loop",
   "132542726":"root",
   "132776501":"changeusername",
   "139667020":"eventlistdir",
   "154241543":"httpbuffersize",
   "155056436":"data",
   "167059646":"gridheight",
   "195813703":"wordcounter",
   "215554231":"hostserver",
   "228247272":"getpartoffile",
   "240930336":"ghostfilesystem",
   "244901031":"getinfo",
   "248801783":"host",
   "255779413":"unpacktmpfile",
   "279092399":"upload",
   "293219277":"size",
   "305723375":"pass",
   "313519599":"urlcheck",
   "313577478":"setnewproxy",
   "357905400":"signal",
   "366810143":"decryptdatabatch",
   "370667478":"domain",
   "407384894":"reset",
   "415241429":"getxmlprotocol",
   "420794500":"send",
   "430094496":"dodecahedron",
   "442138517":"createnewpackage",
   "516914311":"deleteallids",
   "527006325":"password",
   "531484876":"getfirewallchannel",
   "559052501":"handle",
   "572316102":"encryptunpackedbatch",
   "628170205":"create2axisvector",
   "660820342":"status",
   "678633726":"response",
   "686045950":"key",
   "720795223":"systemgridtype",
   "751260152":"disconnectserver",
   "765178446":"fileexpresslog",
   "790553831":"filedir",
   "797572839":"com",
   "808776199":"newline",
   "838798271":"remove",
   "871188246":"bufferpingset",
   "880837391":"getdatapassword",
   "903635127":"removenewcookie",
   "915591078":"emit",
   "944326548":"add",
   "957719598":"set",
   "990374021":"systemportkey",
   "991483244":"getkey",
   "1013591198":"includedirectory",
   "1021447029":"num",
   "1048076341":"val",
   "1100349232":"http",
   "1121669153":"uploaduserstats",
   "1132966809":"sendintelpass",
   "1134071410":"setnewid",
   "1156216704":"emitconfiglist",
   "1194574481":"download",
   "1233080483":"system",
   "1265441804":"rootcookieset",
   "1273314275":"user",
   "1275123731":"patcheventlog",
   "1309840572":"log",
   "1330542338":"list",
   "1348755940":"event",
   "1383476555":"channelsetpackage",
   "1415067395":"encryptfile",
   "1426379963":"protocol",
   "1427892564":"sizeofhexagon",
   "1448429123":"net",
   "1460250107":"type",
   "1485753969":"temp",
   "1518583601":"mysql",
   "1520206552":"respondertimeout",
   "1539334498":"changepassword",
   "1575910186":"connect",
   "1576093377":"batchallfiles",
   "1608714856":"cookies",
   "1623746592":"init",
   "1628495684":"count",
   "1649541986":"stat",
   "1658463369":"statusofprocess",
   "1698678649":"file",
   "1706549392":"destroybatch",
   "1738910777":"global",
   "1747109811":"xml",
   "1752058595":"listconfig",
   "1756029018":"createnewsocket",
   "1774734353":"callmodule",
   "1781566236":"createfilethread",
   "1833071338":"command",
   "1834831619":"exportconfigpackage",
   "1856342026":"create3axisvector",
   "1867449260":"bytes",
   "1875321923":"disconnectchannel",
   "1893810576":"info",
   "1894593187":"hostnewserver",
   "1899624180":"part",
   "1932245595":"loadaltevent",
   "1940102578":"client",
   "1950776900":"blockthreat",
   "1959680427":"buffer",
   "1985229547":"intel",
   "1994545905":"encodenewfolder",
   "1997066579":"join",
   "2005697929":"delete",
   "2017055427":"mergesocket",
   "2036039306":"loadregisterlist",
   "2043894113":"port",
   "2057172594":"generatecodepack",
   "2091700689":"tempdatapass",
   "2092166202":"accountname",
   "2105021824":"load",
   "2117515921":"joinnetworkclient",
   "2117781922":"left",
   "2126421368":"add",
   "2129793064":"disconnect",
   "2136217306":"checkhttptype"
}

*/


var words = {};
var $image = false;

function loadWords ()
{
	words = localStorage.getItem('helper_words');
	if ( words ) {
		words = JSON.parse(words);
		if ( typeof words != 'object' ) {
			words = {};
		}
	} else {
		words = {};
	}
}

function storeWords ()
{
	localStorage.setItem('helper_words', JSON.stringify(words));
}

jQuery(function ($) {
	loadWords();
	$(document.body).on('keydown', 'input[id="tool-type-word"]', function (event) {
		var $this = $(this);
		if ( !$image ) {
			$image = $('#tool-type img.tool-type-img');
			$image.on('load', function (event) {
				var url = $image.attr('src');
				var hash = get_hash(url);
				if ( typeof words[hash] == 'string' ) {
					$('input[id="tool-type-word"]').val(words[hash]);
					setTimeout(function () {
						$('#tool-type-form').submit();
					}, 500);
				}
			});
		}
		var url = $image.attr('src');
		var hash = get_hash(url);
		
		switch ( event.originalEvent.code ) {
			case 'Enter':
				if ( $this.val() != '' ) {
					if ( words[hash] != $this.val() ) {
						words[hash] = $this.val();
						storeWords();
					}
				}
				break;
			case 'Tab':
				event.preventDefault();
				event.stopPropagation();
				
				if ( typeof words[hash] == 'string' ) {
					$this.val(words[hash]);
				} else {
					console.log('undefined word');
				}
				break;
			default:
				break;
		}
	});
	
	console.log('Helper created, words count:', Object.keys(words).length);
});


function get_hash ( s )
{
	return Math.abs(crc32(s));
}



/**
*   Javascript crc32
*   http://www.webtoolkit.info/
*   With slight adjustments (crc init, code order)
**/
function crc32 (str) {
	str = Utf8Encode (str);
	var table = "00000000 77073096 EE0E612C 990951BA 076DC419 706AF48F E963A535 9E6495A3 0EDB8832 79DCB8A4 E0D5E91E 97D2D988 09B64C2B 7EB17CBD E7B82D07 90BF1D91 1DB71064 6AB020F2 F3B97148 84BE41DE 1ADAD47D 6DDDE4EB F4D4B551 83D385C7 136C9856 646BA8C0 FD62F97A 8A65C9EC 14015C4F 63066CD9 FA0F3D63 8D080DF5 3B6E20C8 4C69105E D56041E4 A2677172 3C03E4D1 4B04D447 D20D85FD A50AB56B 35B5A8FA 42B2986C DBBBC9D6 ACBCF940 32D86CE3 45DF5C75 DCD60DCF ABD13D59 26D930AC 51DE003A C8D75180 BFD06116 21B4F4B5 56B3C423 CFBA9599 B8BDA50F 2802B89E 5F058808 C60CD9B2 B10BE924 2F6F7C87 58684C11 C1611DAB B6662D3D 76DC4190 01DB7106 98D220BC EFD5102A 71B18589 06B6B51F 9FBFE4A5 E8B8D433 7807C9A2 0F00F934 9609A88E E10E9818 7F6A0DBB 086D3D2D 91646C97 E6635C01 6B6B51F4 1C6C6162 856530D8 F262004E 6C0695ED 1B01A57B 8208F4C1 F50FC457 65B0D9C6 12B7E950 8BBEB8EA FCB9887C 62DD1DDF 15DA2D49 8CD37CF3 FBD44C65 4DB26158 3AB551CE A3BC0074 D4BB30E2 4ADFA541 3DD895D7 A4D1C46D D3D6F4FB 4369E96A 346ED9FC AD678846 DA60B8D0 44042D73 33031DE5 AA0A4C5F DD0D7CC9 5005713C 270241AA BE0B1010 C90C2086 5768B525 206F85B3 B966D409 CE61E49F 5EDEF90E 29D9C998 B0D09822 C7D7A8B4 59B33D17 2EB40D81 B7BD5C3B C0BA6CAD EDB88320 9ABFB3B6 03B6E20C 74B1D29A EAD54739 9DD277AF 04DB2615 73DC1683 E3630B12 94643B84 0D6D6A3E 7A6A5AA8 E40ECF0B 9309FF9D 0A00AE27 7D079EB1 F00F9344 8708A3D2 1E01F268 6906C2FE F762575D 806567CB 196C3671 6E6B06E7 FED41B76 89D32BE0 10DA7A5A 67DD4ACC F9B9DF6F 8EBEEFF9 17B7BE43 60B08ED5 D6D6A3E8 A1D1937E 38D8C2C4 4FDFF252 D1BB67F1 A6BC5767 3FB506DD 48B2364B D80D2BDA AF0A1B4C 36034AF6 41047A60 DF60EFC3 A867DF55 316E8EEF 4669BE79 CB61B38C BC66831A 256FD2A0 5268E236 CC0C7795 BB0B4703 220216B9 5505262F C5BA3BBE B2BD0B28 2BB45A92 5CB36A04 C2D7FFA7 B5D0CF31 2CD99E8B 5BDEAE1D 9B64C2B0 EC63F226 756AA39C 026D930A 9C0906A9 EB0E363F 72076785 05005713 95BF4A82 E2B87A14 7BB12BAE 0CB61B38 92D28E9B E5D5BE0D 7CDCEFB7 0BDBDF21 86D3D2D4 F1D4E242 68DDB3F8 1FDA836E 81BE16CD F6B9265B 6FB077E1 18B74777 88085AE6 FF0F6A70 66063BCA 11010B5C 8F659EFF F862AE69 616BFFD3 166CCF45 A00AE278 D70DD2EE 4E048354 3903B3C2 A7672661 D06016F7 4969474D 3E6E77DB AED16A4A D9D65ADC 40DF0B66 37D83BF0 A9BCAE53 DEBB9EC5 47B2CF7F 30B5FFE9 BDBDF21C CABAC28A 53B39330 24B4A3A6 BAD03605 CDD70693 54DE5729 23D967BF B3667A2E C4614AB8 5D681B02 2A6F2B94 B40BBE37 C30C8EA1 5A05DF1B 2D02EF8D";
	var crc = 0;
	var x = 0;
	var y = 0;

	for (var i = 0, iTop = str.length; i < iTop; i++) {
		y = (crc ^ str.charCodeAt (i) ) & 0xFF;
		x = "0x" + table.substr (y * 9, 8);
		crc = (crc >>> 8) ^ x;
	}

	return crc ^ (-1);

	function Utf8Encode (string) {
		string = string.replace (/\r\n/g,"\n");
		var utftext = "";
		for (var n = 0; n < string.length; n++) {
			var c = string.charCodeAt (n);
			if (c < 128) {
				utftext += String.fromCharCode (c);
			}
			else if ((c > 127) && (c < 2048)) {
				utftext += String.fromCharCode ((c >> 6) | 192);
				utftext += String.fromCharCode ((c & 63) | 128);
			}
			else {
				utftext += String.fromCharCode ((c >> 12) | 224);
				utftext += String.fromCharCode (( (c >> 6) & 63) | 128);
				utftext += String.fromCharCode ((c & 63) | 128);
			}
		}
		return utftext;
	};
};// ==UserScript==
// @name            s0urce.io Bot Typer
// @namespace       https://greasyfork.org/scripts/403693-s0urce-io-bot-typer
// @author          anonymous kyb - anonymous.kyb12
// @include         http://s0urce.io/
// @include         http://ioground.com/play/s0urce-io
// @include         http://unblockediogames.com/s0urce-io.html
// @include         http://www.frivgamesunblocked.com/play/s0urceio.html
// @version         4
// @grant           GM_xmlhttpRequest
// @grant           GM_getResourceText
// @grant           GM_getValue
// @grant           GM_setValue
// @grant           unsafeWindow
// @require         https://greasyfork.org/en/scripts/403693-s0urce-io-bot-typer
// @require         https://github.com/anonymous-kyb12/s0urce.io-Bot-Typer
// @description     This script uses a bot to store words that it has already seen you type correctly, then it re-inputs that word again when you stumble upon it. No need to go into the DevTools Console.
// @icon            https://o.remove.bg/uploads/af358ff8-098d-4569-98c1-c417a242a050/s0urce.io.png
// ==/UserScript==

(function() {
    'use strict';
}
/*

{
   "1040837":"url",
   "22217341":"socket",
   "31812199":"getmysqldomain",
   "54611670":"loadloggedpassword",
   "70027981":"removeoldcookie",
   "77901092":"right",
   "104777318":"loop",
   "132542726":"root",
   "132776501":"changeusername",
   "139667020":"eventlistdir",
   "154241543":"httpbuffersize",
   "155056436":"data",
   "167059646":"gridheight",
   "195813703":"wordcounter",
   "215554231":"hostserver",
   "228247272":"getpartoffile",
   "240930336":"ghostfilesystem",
   "244901031":"getinfo",
   "248801783":"host",
   "255779413":"unpacktmpfile",
   "279092399":"upload",
   "293219277":"size",
   "305723375":"pass",
   "313519599":"urlcheck",
   "313577478":"setnewproxy",
   "357905400":"signal",
   "366810143":"decryptdatabatch",
   "370667478":"domain",
   "407384894":"reset",
   "415241429":"getxmlprotocol",
   "420794500":"send",
   "430094496":"dodecahedron",
   "442138517":"createnewpackage",
   "516914311":"deleteallids",
   "527006325":"password",
   "531484876":"getfirewallchannel",
   "559052501":"handle",
   "572316102":"encryptunpackedbatch",
   "628170205":"create2axisvector",
   "660820342":"status",
   "678633726":"response",
   "686045950":"key",
   "720795223":"systemgridtype",
   "751260152":"disconnectserver",
   "765178446":"fileexpresslog",
   "790553831":"filedir",
   "797572839":"com",
   "808776199":"newline",
   "838798271":"remove",
   "871188246":"bufferpingset",
   "880837391":"getdatapassword",
   "903635127":"removenewcookie",
   "915591078":"emit",
   "944326548":"add",
   "957719598":"set",
   "990374021":"systemportkey",
   "991483244":"getkey",
   "1013591198":"includedirectory",
   "1021447029":"num",
   "1048076341":"val",
   "1100349232":"http",
   "1121669153":"uploaduserstats",
   "1132966809":"sendintelpass",
   "1134071410":"setnewid",
   "1156216704":"emitconfiglist",
   "1194574481":"download",
   "1233080483":"system",
   "1265441804":"rootcookieset",
   "1273314275":"user",
   "1275123731":"patcheventlog",
   "1309840572":"log",
   "1330542338":"list",
   "1348755940":"event",
   "1383476555":"channelsetpackage",
   "1415067395":"encryptfile",
   "1426379963":"protocol",
   "1427892564":"sizeofhexagon",
   "1448429123":"net",
   "1460250107":"type",
   "1485753969":"temp",
   "1518583601":"mysql",
   "1520206552":"respondertimeout",
   "1539334498":"changepassword",
   "1575910186":"connect",
   "1576093377":"batchallfiles",
   "1608714856":"cookies",
   "1623746592":"init",
   "1628495684":"count",
   "1649541986":"stat",
   "1658463369":"statusofprocess",
   "1698678649":"file",
   "1706549392":"destroybatch",
   "1738910777":"global",
   "1747109811":"xml",
   "1752058595":"listconfig",
   "1756029018":"createnewsocket",
   "1774734353":"callmodule",
   "1781566236":"createfilethread",
   "1833071338":"command",
   "1834831619":"exportconfigpackage",
   "1856342026":"create3axisvector",
   "1867449260":"bytes",
   "1875321923":"disconnectchannel",
   "1893810576":"info",
   "1894593187":"hostnewserver",
   "1899624180":"part",
   "1932245595":"loadaltevent",
   "1940102578":"client",
   "1950776900":"blockthreat",
   "1959680427":"buffer",
   "1985229547":"intel",
   "1994545905":"encodenewfolder",
   "1997066579":"join",
   "2005697929":"delete",
   "2017055427":"mergesocket",
   "2036039306":"loadregisterlist",
   "2043894113":"port",
   "2057172594":"generatecodepack",
   "2091700689":"tempdatapass",
   "2092166202":"accountname",
   "2105021824":"load",
   "2117515921":"joinnetworkclient",
   "2117781922":"left",
   "2126421368":"add",
   "2129793064":"disconnect",
   "2136217306":"checkhttptype"
}

*/


var words = {};
var $image = false;

function loadWords ()
{
	words = localStorage.getItem('helper_words');
	if ( words ) {
		words = JSON.parse(words);
		if ( typeof words != 'object' ) {
			words = {};
		}
	} else {
		words = {};
	}
}

function storeWords ()
{
	localStorage.setItem('helper_words', JSON.stringify(words));
}

jQuery(function ($) {
	loadWords();
	$(document.body).on('keydown', 'input[id="tool-type-word"]', function (event) {
		var $this = $(this);
		if ( !$image ) {
			$image = $('#tool-type img.tool-type-img');
			$image.on('load', function (event) {
				var url = $image.attr('src');
				var hash = get_hash(url);
				if ( typeof words[hash] == 'string' ) {
					$('input[id="tool-type-word"]').val(words[hash]);
					setTimeout(function () {
						$('#tool-type-form').submit();
					}, 500);
				}
			});
		}
		var url = $image.attr('src');
		var hash = get_hash(url);
		
		switch ( event.originalEvent.code ) {
			case 'Enter':
				if ( $this.val() != '' ) {
					if ( words[hash] != $this.val() ) {
						words[hash] = $this.val();
						storeWords();
					}
				}
				break;
			case 'Tab':
				event.preventDefault();
				event.stopPropagation();
				
				if ( typeof words[hash] == 'string' ) {
					$this.val(words[hash]);
				} else {
					console.log('undefined word');
				}
				break;
			default:
				break;
		}
	});
	
	console.log('Helper created, words count:', Object.keys(words).length);
});


function get_hash ( s )
{
	return Math.abs(crc32(s));
}



/**
*   Javascript crc32
*   http://www.webtoolkit.info/
*   With slight adjustments (crc init, code order)
**/
function crc32 (str) {
	str = Utf8Encode (str);
	var table = "00000000 77073096 EE0E612C 990951BA 076DC419 706AF48F E963A535 9E6495A3 0EDB8832 79DCB8A4 E0D5E91E 97D2D988 09B64C2B 7EB17CBD E7B82D07 90BF1D91 1DB71064 6AB020F2 F3B97148 84BE41DE 1ADAD47D 6DDDE4EB F4D4B551 83D385C7 136C9856 646BA8C0 FD62F97A 8A65C9EC 14015C4F 63066CD9 FA0F3D63 8D080DF5 3B6E20C8 4C69105E D56041E4 A2677172 3C03E4D1 4B04D447 D20D85FD A50AB56B 35B5A8FA 42B2986C DBBBC9D6 ACBCF940 32D86CE3 45DF5C75 DCD60DCF ABD13D59 26D930AC 51DE003A C8D75180 BFD06116 21B4F4B5 56B3C423 CFBA9599 B8BDA50F 2802B89E 5F058808 C60CD9B2 B10BE924 2F6F7C87 58684C11 C1611DAB B6662D3D 76DC4190 01DB7106 98D220BC EFD5102A 71B18589 06B6B51F 9FBFE4A5 E8B8D433 7807C9A2 0F00F934 9609A88E E10E9818 7F6A0DBB 086D3D2D 91646C97 E6635C01 6B6B51F4 1C6C6162 856530D8 F262004E 6C0695ED 1B01A57B 8208F4C1 F50FC457 65B0D9C6 12B7E950 8BBEB8EA FCB9887C 62DD1DDF 15DA2D49 8CD37CF3 FBD44C65 4DB26158 3AB551CE A3BC0074 D4BB30E2 4ADFA541 3DD895D7 A4D1C46D D3D6F4FB 4369E96A 346ED9FC AD678846 DA60B8D0 44042D73 33031DE5 AA0A4C5F DD0D7CC9 5005713C 270241AA BE0B1010 C90C2086 5768B525 206F85B3 B966D409 CE61E49F 5EDEF90E 29D9C998 B0D09822 C7D7A8B4 59B33D17 2EB40D81 B7BD5C3B C0BA6CAD EDB88320 9ABFB3B6 03B6E20C 74B1D29A EAD54739 9DD277AF 04DB2615 73DC1683 E3630B12 94643B84 0D6D6A3E 7A6A5AA8 E40ECF0B 9309FF9D 0A00AE27 7D079EB1 F00F9344 8708A3D2 1E01F268 6906C2FE F762575D 806567CB 196C3671 6E6B06E7 FED41B76 89D32BE0 10DA7A5A 67DD4ACC F9B9DF6F 8EBEEFF9 17B7BE43 60B08ED5 D6D6A3E8 A1D1937E 38D8C2C4 4FDFF252 D1BB67F1 A6BC5767 3FB506DD 48B2364B D80D2BDA AF0A1B4C 36034AF6 41047A60 DF60EFC3 A867DF55 316E8EEF 4669BE79 CB61B38C BC66831A 256FD2A0 5268E236 CC0C7795 BB0B4703 220216B9 5505262F C5BA3BBE B2BD0B28 2BB45A92 5CB36A04 C2D7FFA7 B5D0CF31 2CD99E8B 5BDEAE1D 9B64C2B0 EC63F226 756AA39C 026D930A 9C0906A9 EB0E363F 72076785 05005713 95BF4A82 E2B87A14 7BB12BAE 0CB61B38 92D28E9B E5D5BE0D 7CDCEFB7 0BDBDF21 86D3D2D4 F1D4E242 68DDB3F8 1FDA836E 81BE16CD F6B9265B 6FB077E1 18B74777 88085AE6 FF0F6A70 66063BCA 11010B5C 8F659EFF F862AE69 616BFFD3 166CCF45 A00AE278 D70DD2EE 4E048354 3903B3C2 A7672661 D06016F7 4969474D 3E6E77DB AED16A4A D9D65ADC 40DF0B66 37D83BF0 A9BCAE53 DEBB9EC5 47B2CF7F 30B5FFE9 BDBDF21C CABAC28A 53B39330 24B4A3A6 BAD03605 CDD70693 54DE5729 23D967BF B3667A2E C4614AB8 5D681B02 2A6F2B94 B40BBE37 C30C8EA1 5A05DF1B 2D02EF8D";
	var crc = 0;
	var x = 0;
	var y = 0;

	for (var i = 0, iTop = str.length; i < iTop; i++) {
		y = (crc ^ str.charCodeAt (i) ) & 0xFF;
		x = "0x" + table.substr (y * 9, 8);
		crc = (crc >>> 8) ^ x;
	}

	return crc ^ (-1);

	function Utf8Encode (string) {
		string = string.replace (/\r\n/g,"\n");
		var utftext = "";
		for (var n = 0; n < string.length; n++) {
			var c = string.charCodeAt (n);
			if (c < 128) {
				utftext += String.fromCharCode (c);
			}
			else if ((c > 127) && (c < 2048)) {
				utftext += String.fromCharCode ((c >> 6) | 192);
				utftext += String.fromCharCode ((c & 63) | 128);
			}
			else {
				utftext += String.fromCharCode ((c >> 12) | 224);
				utftext += String.fromCharCode (( (c >> 6) & 63) | 128);
				utftext += String.fromCharCode ((c & 63) | 128);
			}
		}
		return utftext;
	};
};
