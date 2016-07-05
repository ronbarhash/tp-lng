var fs = require('fs');
var globArr = [];
var lng = {};
var count_ru = 0, count_all =0;
var text =  {};

var en = fs.readFileSync('src/en.csv', 'utf8');
var en_arr = en.split("\r\n");
for(var i in en_arr){
    var tmp_arr = en_arr[i].split(";");
    text[tmp_arr[0]]=tmp_arr[1];
}

var contents = fs.readFileSync('src/lng/tpChannel_ru.lng', 'utf8');
var arr = contents.split("\r\n");
for(var i in arr){
    var tmp = arr[i].split("=");
    lng[tmp[0]]=tmp[1];

     if (tmp[1] in text){
        count_all++;

        if (text[tmp[1]].search(/[А-яЁё]/) > 0 ){
            globArr[tmp[0]] = tmp[0] + "=" + tmp[0];
            // globArr[tmp[0]] = tmp[0] + "=" + text[tmp[1]]; // AAAA

            count_ru++;
        }
        else {
            text[tmp[1]] = text[tmp[1]].replace("***","")
            globArr[tmp[0]] = tmp[0] + "=" + text[tmp[1]];
        }

    }else globArr[tmp[0]] = tmp[0];
    if(j === globArr[j])
        globArr[j]="";

}
console.log(globArr);
for (var j in globArr){
    if( globArr[j].indexOf("[") >0 )
        fs.appendFileSync('dist/tpChannel_en.lng', "\n" + globArr[j] + '\r\n','ascii' );
    else
        fs.appendFileSync('dist/tpChannel_en.lng', globArr[j] + '\r\n' );

    //console.log(j+globArr[j]);
}
console.log("RU =" + count_ru + " and ALL = " + count_all);
