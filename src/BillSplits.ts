import logger from "./config/logger";
import listOfBills from "./constants";

  logger.info("BillSplits Program");

  function create_lists(listOfBills:any):any[]{ 
    //Function create the list of objects from the bill
    logger.log('info',"Creating Lists");
    var array_list=new Array();
      for(var i in listOfBills['lineItems']){
      array_list.push(Object.values(listOfBills['lineItems'][i]));
      //the items are extracted and pushed into the list here.
  }
  return array_list;
  }
  
  var array_list=listOfBills.map(create_lists);
  //the array list is returned here
  
function create_dicts(array_list:any):any{
  logger.log('info',"Creating Objects");
    //from the list the objects are created here
    var list=[];
    for(var i in array_list){
      var dicts = {};
      // create an empty object
      for(var j in array_list[i]){
      //the array list is looped for creating the object and the corresponding values
      dicts[array_list[i][j][0]]=array_list[i][j][1];
      }
      list.push(dicts);
    }
    return list;
}

var items=create_dicts(array_list);
var Bill1=items[0];
var Bill2=items[1];
  
function summarizeByUsers(dicts_array:any):any{
    /*taking the array of objects, the objects are combined 
    into a single object and the amount is added based on keys as condition*/
  logger.log('info',"Summarizing by Users");
  var out_dict = {};
  for(var dict in dicts_array){
        for(var d in dicts_array[dict]){
            if(!(Object.keys(out_dict).includes(d))){
              /*the out_dict is searched for presence of keys, if the 
              keys are not present the object is updated*/
                out_dict[d] = dicts_array[dict][d];
            } else {
              //if the keys are present the amount value is added with the existing value
                out_dict[d] += dicts_array[dict][d];
            }
        }
    }
    
    return out_dict
}

var summarize_ByUsers:any=summarizeByUsers([Bill1,Bill2]);
//logger.info("Summarized By Users:");
logger.log('info','summarize_ByUsers');

function BillSplits(dict:any):any {
    logger.log('info',"Final bill splits calculation");
    //the bill is splitted and the debt amount is calculated
    var paidBy:string[]= Object.keys(dict);
    let listInitial:string[]=paidBy.slice();
    var amount:number[]= Object.values(dict);
    //paidBy and amount is extracted into a list 
    let totalAmount:number= amount.reduce((acc, curr) => curr+acc);
    var share:number = Math.round(totalAmount/paidBy.length);
    //Share per paidBy is calculated
    let sortedPaidBy:string[]= paidBy.sort((p1,p2) => dict[p1]-dict[p2]);
    //the paidBy is sorted in ascending order of the amount paid
    const sortedValuesPaid:number[]= sortedPaidBy.map((person) => dict[person]-share);
    //the amount of values are also sorted for debt calculation
    console.log("PaidBy "+" Share "+" Amount "+" Remaining ");
    for(var d in paidBy){
        console.log(listInitial[d]+"\t"+share+"\t"+amount[d]+"\t"+(amount[d]-share));
    }
    console.log("\n");
    let i = 0;
    let j = sortedPaidBy.length - 1;
    let debt:number;
    while (i < j) {
      debt = Math.min(-(sortedValuesPaid[i]), sortedValuesPaid[j]);
      sortedValuesPaid[i] += debt;
      sortedValuesPaid[j] -= debt;
      //Final part of the bill calculation of owing the debt is calculated
      console.log(sortedPaidBy[i]+" owes "+sortedPaidBy[j]+" "+debt);
      if (sortedValuesPaid[i] === 0) {
        i++;
      }
      if (sortedValuesPaid[j] === 0) {
        j--;
      }
    }
  }
  
  BillSplits(summarize_ByUsers);
  //Calling the function to split the bills