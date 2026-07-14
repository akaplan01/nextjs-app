export async function getServerTime(){
    const serverTime = new Date().toISOString();
    return serverTime;
}