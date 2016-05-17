var html_colors = ["AliceBlue", "AntiqueWhite", "Aqua", "Aquamarine", "Azure", "Beige", "Bisque", "Black", "BlanchedAlmond", "Blue", "BlueViolet", "Brown", "BurlyWood", "CadetBlue", "Chartreuse", "Chocolate", "Coral", "CornflowerBlue", "Cornsilk", "Crimson", "Cyan", "DarkBlue", "DarkCyan", "DarkGoldenRod", "DarkGray", "DarkGrey", "DarkGreen", "DarkKhaki", "DarkMagenta", "DarkOliveGreen", "DarkOrange", "DarkOrchid", "DarkRed", "DarkSalmon", "DarkSeaGreen", "DarkSlateBlue", "DarkSlateGray", "DarkSlateGrey", "DarkTurquoise", "DarkViolet", "DeepPink", "DeepSkyBlue", "DimGray", "DimGrey", "DodgerBlue", "FireBrick", "FloralWhite", "ForestGreen", "Fuchsia", "Gainsboro", "GhostWhite", "Gold", "GoldenRod", "Gray", "Grey", "Green", "GreenYellow", "HoneyDew", "HotPink", "IndianRed", "Indigo", "Ivory", "Khaki", "Lavender", "LavenderBlush", "LawnGreen", "LemonChiffon", "LightBlue", "LightCoral", "LightCyan", "LightGoldenRodYellow", "LightGray", "LightGrey", "LightGreen", "LightPink", "LightSalmon", "LightSeaGreen", "LightSkyBlue", "LightSlateGray", "LightSlateGrey", "LightSteelBlue", "LightYellow", "Lime", "LimeGreen", "Linen", "Magenta", "Maroon", "MediumAquaMarine", "MediumBlue", "MediumOrchid", "MediumPurple", "MediumSeaGreen", "MediumSlateBlue", "MediumSpringGreen", "MediumTurquoise", "MediumVioletRed", "MidnightBlue", "MintCream", "MistyRose", "Moccasin", "NavajoWhite", "Navy", "OldLace", "Olive", "OliveDrab", "Orange", "OrangeRed", "Orchid", "PaleGoldenRod", "PaleGreen", "PaleTurquoise", "PaleVioletRed", "PapayaWhip", "PeachPuff", "Peru", "Pink", "Plum", "PowderBlue", "Purple", "RebeccaPurple", "Red", "RosyBrown", "RoyalBlue", "SaddleBrown", "Salmon", "SandyBrown", "SeaGreen", "SeaShell", "Sienna", "Silver", "SkyBlue", "SlateBlue", "SlateGray", "SlateGrey", "Snow", "SpringGreen", "SteelBlue", "Tan", "Teal", "Thistle", "Tomato", "Turquoise", "Violet", "Wheat", "White", "WhiteSmoke", "Yellow", "YellowGreen"];
var liaison = ["and", "to", "n"];
var color_color, value, need_color, none, percent, auto, valueXvalue, value,value; // percent === !isNaN(nb entier ou non) + %
// var html_colors = require('./laszlo');

module.exports = {

	grayscale : {
		racine : 'grayscale',
		synonym : 'blacknwhite',
		command : '-colorspace',
		param : 'Gray',
		need_param : false,
		need_color : 0
	},
	levelcolors : {
		racine : 'levelcolors',
		synonym : 'monochrome',
		command : '+level-colors',
		param : ',White',
		need_param : { boolean : true, type : "color_color" },
		need_color : 2
	},
	levels : {
		racine : 'levels',
		synonym : 'levels',
		command : '-level',
		param : '50%,50%',
		need_param : { boolean : false, type : "value_value" },
		need_color : 0
	},
	wave : {
		racine : 'wave',
		synonym : 'distorsion',
		command : '-wave',
		param : '150x150',
		need_param : { boolean : true, type : "valueXvalue" },
		need_color : 0
	},
	flag : {
		racine : 'flag',
		synonym : 'ondulation',
		command : '-wave',
		param : '5x250',
		need_param : false,
		need_color : 0
	},
	rotation : {
		racine : 'rotation',
		synonym : 'rotate',
		command : '-rotate',
		param : 45,
		need_param : { boolean : true, type : "value" }, // exp digit
		need_color : 0
	}, 
	fill : {
		racine : 'fill',
		synonym : '',
		command : '-fill',
		param : 'Black',
		need_param : { boolean : true, type : "html_colors" },
		need_color : 1
	},
	fill2 : {
		command : '-colorize',
		param : '100%',
		need_param : { boolean : false, type : "value_percent" },
		need_color : 0
	}
};

<<<<<<< HEAD
console.log("…Laszlo dictionnary ready");
=======
console.log("…Laszlo dictionnary ready");
>>>>>>> FETCH_HEAD
