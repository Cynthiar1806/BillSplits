import billSplits from "./BillSplits";
import logger from "./config/logger";
import listOfBills from './constants';
import printing from "./Printing";

type inputData = typeof listOfBills;

async function implement() {
    console.log("Bill Splits Program");
    const bs = new billSplits(listOfBills);
    try {
        const billItems = await bs.extractBills();
        const dataMap = await bs.summarizeBills(billItems);
        const finalSettlement = await bs.billSplits(dataMap);
        finalSettlement.map(printing);
        
    }
    catch (error) {
        logger.log("Error", error);
    }
    finally {
        logger.log("info", "Bill is splitted");
    }
}

implement()