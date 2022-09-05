import logger from "./config/logger";
import listOfBills from "./constants";

class billSplits{
    
    createLists(listOfBills:any):[]{ 
        //Function create the list of objects from the bill
        logger.log('info',"Creating Lists");
        var listOfObjects:any=[];
        listOfBills.forEach(function(value){
        value.lineItems.forEach(element => {
        listOfObjects.push(element);
       });
     })
     return listOfObjects;
    }

    groupObjects(data:any):Map<string,number>{
        //the amount value is added based on keys in map
        logger.log('info',"Grouping Objects based on keys");
        let paidAmountMapping: Map<string,number> = new Map([]);
        data.forEach((item)=>{
            if(!(paidAmountMapping.has(item.paidBy))){
                paidAmountMapping.set(item.paidBy,item.amount);
            }
            else{
                paidAmountMapping.set(item.paidBy,paidAmountMapping.get(item.paidBy)+item.amount);
            } 
        })
        return paidAmountMapping;
    }

    billSplits(dataMap:Map<string,number>):any {
        //The final bill split is calculated
        logger.log('info',"Final bill splits calculation");
        //the bill is splitted and the debt amount is calculated
        var paidBy = Array.from(dataMap.keys());
        let listInitial:string[]=paidBy.slice();
        var amount = Array.from(dataMap.values());
        //paidBy and amount is extracted into a list 
        let totalAmount:number= amount.reduce((acc, curr) => curr+acc);
        var share:number = Math.round(totalAmount/paidBy.length);
        //Share per paidBy is calculated
        let sortedPaidBy:string[]= paidBy.sort((p1,p2) => dataMap.get(p1) - dataMap.get(p2));
        const sortedValuesPaid:number[]= sortedPaidBy.map((person) => dataMap.get(person)-share);
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
    
}
logger.info('BillSplits Program');
console.log('info',"BillSplits Program");
var bs = new billSplits();  
logger.log('info',"Creating objects for the class");
var arrayList:[]=bs.createLists(listOfBills);
var dataMap:Map<string,number>=bs.groupObjects(arrayList);
bs.billSplits(dataMap);
//Calling the function to split the bills