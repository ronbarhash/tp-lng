var fs = require('fs');
var globArr = [];
var lng = {};
var count_ru = 0, count_all =0;
var ifile = 'src/en.csv';
var ofile = 'src/lng/tpChannel_ru.lng';

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
//
// var en = fs.readFileSync('src/en.csv', 'utf8');
// var en_arr = en.split("\r\n");
// for(var i in en_arr){
//     var tmp_arr = en_arr[i].split(";");
//     text[tmp_arr[0]]=tmp_arr[1];
// }

var text = file4Arr(ifile, ";");

// var contents = fs.readFileSync('src/lng/tpChannel_ru.lng', 'utf8');
// var arr = contents.split("\r\n");
// for(var i in arr){
//     var tmp = arr[i].split("=");
//     lng[tmp[0]]=tmp[1];

var lng = file4Arr(ofile,"=");


for(var i in lng){ //
     if (lng[i] in text){
        count_all++;
        if (text[lng[i]].search(/[А-яЁё]/) > 0 ){
            //globArr[i] = i + "=" + i; // miCaptions
            globArr[i] = i + "=" + text[lng[i]]; // RU ***
            count_ru++;
        }
        else {
            text[lng[i]] = text[lng[i]].replace("***","")
            globArr[i] = i + "=" + text[lng[i]];
        }

    }else globArr[i] = i;
    if(i === globArr[i])
        globArr[i]="";

}
console.log(globArr);
for (var j in globArr){
    if( globArr[j].indexOf("[") >0 )
        fs.appendFileSync('dist/tpChannel_en.lng', "\n" + globArr[j] + '\r\n','ascii' );
    else
        fs.appendFileSync('dist/tpChannel_en.lng', globArr[j] + '\r\n' );
}
console.log("RU =" + count_ru + " and ALL = " + count_all);
