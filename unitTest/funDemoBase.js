// exports.adder = function (num){ 
//   return function (x){ 
//     var result = num + x; 
//     return result
//     } 
//  } 

export default function addNum (num) {
    return function(x){
        var result = num + x
        return result
    }
}