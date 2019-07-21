async function sleep(ms: number) {
    await setTimeout(() => {
        
    }, ms);
    return;
}

global.sleep = sleep;

export default sleep;