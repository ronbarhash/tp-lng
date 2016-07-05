var fs = require('fs');
var globArr = [];
var lng = {};
var count_ru = 0, count_all =0;
var ifile = 'src/en.csv';
var rufile = 'src/lng/tpChannel_ru.lng';
var enfile = 'dist/tpChannel_en.lng';

function file4Arr(fileName, separate){
    var arr =  {};
    var f = fs.readFileSync(fileName, 'utf8');
    var f_arr = f.split("\r\n");
    for(var i in f_arr){
        var tmp_arr = f_arr[i].split(separate);
        arr[tmp_arr[0]]=tmp_arr[1];
    }
    return arr;
}

var text = file4Arr(ifile, ";");
var lng = file4Arr(rufile,"=");

for(var i in lng){ //
     if (lng[i] in text){
        count_all++;
        if (text[lng[i]].search(/[А-яЁё]/) > 0 ){
            globArr[i] = i + "=" + i + "!!!"; // miCaptions
            // globArr[i] = i + "=" + text[lng[i]]; // RU ***
            count_ru++;
        }
        else {
            text[lng[i]] = text[lng[i]].replace("***","")
            globArr[i] = i + "=" + text[lng[i]];
        }
    }else {
        globArr[i] = i;
    }
}
console.log(globArr);

fs.truncateSync(enfile);

for (var j in globArr){
    if( (typeof(globArr[j]) == 'undefined') || (globArr[j]) == '')
        fs.appendFileSync(enfile, "\n" + j + '\r\n','ascii' );
    else
        fs.appendFileSync(enfile, globArr[j] + '\r\n' );
}

console.log("RU =" + count_ru + " and ALL = " + count_all);
