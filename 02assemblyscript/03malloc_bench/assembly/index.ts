import { log, logi } from "./env";

var arr = new Array<Date>(200);

function randomNew(): void {
    for (let index = 0; index < 200; index++) {
        arr.push(new Date(Date.now()));
    }
}

export function main(): void {
    logi(__heap_base);
    let a = 0;
    let before = Date.now();
    let averageTimeCost:i64 = 0;
    var index = 0;
    while (index < 10_000_000) {
        a++;
        index++;
        if (a > 10_000) { // log time cost information and memory usage information every 10_000 times
            a = 0;
            let now = Date.now();
            log("memory information after 100,000 times:");
            logi(memory.size() << 16);
            log("time cost:");
            logi(<usize>(now - before));
            if(averageTimeCost == 0) {
                averageTimeCost = (now - before);
            } else {
                averageTimeCost += (now - before);
                averageTimeCost = averageTimeCost / 2;
            }
            before = now;
        }
        randomNew();
        arr = new Array<Date>(200);
    }
    log("finished the bench run, averageTimeCost:");
    logi(<usize>averageTimeCost);
}
