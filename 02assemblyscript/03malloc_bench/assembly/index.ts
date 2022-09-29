import { log, logi } from "./env";

const xAxis: Array<u32> = [2, 5, 8, 10, 20, 50, 80, 100, 200, 500, 1000];
const yAxis = new Array<usize>();

var dateArray = new Array<Date>();
var arrayArray = new Array<String>();

function randomNew(x: i32): void {
    for (let index = 0; index < x; index++) {
        if (Math.random() > 0.5) {
            dateArray.push(new Date(Date.now()));
        } else {
            arrayArray.push(index.toString());
        }
    }
}

function runBench(xIndex: i32): void {
    logi(__heap_base);
    let a = 0;
    let before = Date.now();
    let averageTimeCost: i64 = 0;
    var index = 0;
    var times = 100_000_000 / xAxis[xIndex];
    log("xAxis = ");
    logi(<usize>xAxis[xIndex]);
    while (index < times) {
        a++;
        index++;
        if (a > 10_000) { // log time cost information and memory usage information every 10_000 times
            a = 0;
            let now = Date.now();
            // log("memory information after 100,000 times:");
            // logi(memory.size() << 16);
            // log("time cost:");
            // logi(<usize>(now - before));
            if (averageTimeCost == 0) {
                averageTimeCost = (now - before);
            } else {
                averageTimeCost += (now - before);
                averageTimeCost = averageTimeCost / 2;
            }
            before = now;
        }
        randomNew(<i32>xAxis[xIndex]);
        dateArray = new Array<Date>();
        arrayArray = new Array<String>();
    }
    log("finished the bench run, averageTimeCost:");
    logi(<usize>averageTimeCost);
    yAxis.push(<usize>averageTimeCost);
}

export function main(): void {
    for (let index = 0; index < xAxis.length; index++) {
        runBench(index);
    }
    log("------------bench finished--------------");
    log("xAxis(");
    for (let index = 0; index < xAxis.length; index++) {
        logi(xAxis[index]);
    }
    log(")");
    log("yAxis(");
    for (let index = 0; index < yAxis.length; index++) {
        logi(yAxis[index]);
    }
    log(")");
    log("----------------------------------------");
}
