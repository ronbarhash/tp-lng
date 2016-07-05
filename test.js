var fs = require('fs');
var globArr = [];
var lng = {};

 var text =  {};
 //{'GUID кат':'***GUID cat',
// 'GUID категории вставки':'***GUID of spot catogory',
// 'GUID клипа':'***GUID of clip',
// 'GUID передачи':'***GUID of program',
// 'GUID прем':'***GUID prem#'};

var en = fs.readFileSync('d:/en.csv', 'utf8');
var en_arr = en.split("\r\n");
for(var i in en_arr){
    var tmp_arr = en_arr[i].split(";");
    text[tmp_arr[0]]=tmp_arr[1];
}
// console.log(text);

var contents = fs.readFileSync('d:/test.lng', 'utf8');
var arr = contents.split("\r\n");
for(var i in arr){
    var tmp = arr[i].split("=");
    lng[tmp[0]]=tmp[1];

     if (tmp[1] in text){
        //console.log(tmp[0] + " - " + text[tmp[1]] );

        // globArr[tmp[0]]=text[tmp[1]];
        if (text[tmp[1]].search(/[А-яЁё]/) > 0 ){
            globArr[tmp[0]] = tmp[0] + "=" + text[tmp[1]];
        }
        else {
            text[tmp[1]] = text[tmp[1]].replace("***","")
            globArr[tmp[0]] = tmp[0] + "=" + text[tmp[1]];
            console.log(text[tmp[1]]);
        }

}else globArr[tmp[0]] = tmp[0];

}
    for (var j in globArr){
    fs.appendFile('d:/test.en.txt', globArr[j] + '\r\n' , function (err) {
    });
}
