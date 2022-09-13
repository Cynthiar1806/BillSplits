import logger from "./config/logger";

const printing = (toPrint) => {
    toPrint.forEach(element => {
        console.log(element);
        logger.log("info","Printing the objects")
        });     
}

export default printing;