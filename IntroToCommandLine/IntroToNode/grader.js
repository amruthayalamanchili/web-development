var result = 0;
function average(arr){
    var length = arr.length;
    for(var i = 0;i<arr.length;i++){
        //add all scores together
        result = result + arr[i];
    }
    //divide by total number of scores and round the value
    return Math.round(result/length);
}
var scores = [10,20,30,25,55,65];
console.log(average(scores));