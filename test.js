function main(){
  throw "e2";
}
async function error(){ 
try{
  main();
} catch (err){
  send(err)
  await delay(60000);
  error();
}
}
error();