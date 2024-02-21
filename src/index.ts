import GiftSystem from "./Giftsystem";

const argv = process.argv;

const readline = require('readline');
var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const GiftsystemInstance = new GiftSystem();
GiftsystemInstance.loadDataFromCSV("./sample/" + argv[2]).then(() => {
    searchPrompt()
})

function searchPrompt() {
    rl.question('GiftRedemption> ', (inputsteam: String) => {
        const input: string[] = inputsteam.split(" ")
        switch (input[0].toLowerCase()) {
            case "lookup":
                const teamname = GiftsystemInstance.lookUpStaffToTeam(input[1])
                if(teamname){
                    console.log(`${input[1]} is from Team ${teamname}`)
                }
                else{
                    console.log(`${input[1]} does not exist`)
                }
                break;
            case "verify":
                const isVerified = GiftsystemInstance.verifyRedemption(input[1])
                if(isVerified == null){
                    console.log(`Team ${input[1]} does not exist`)
                }
                else if(isVerified){
                    console.log(`Team ${input[1]} can claim the gift`)
                }
                else{
                    console.log(`Team ${input[1]} had claimed the gift`)
                }
                break;
        
            case "redeem":
                const hasRedeemed = GiftsystemInstance.addNewRedemption(input[1])
                if(hasRedeemed  == null){
                    console.log(`Team ${input[1]} does not exist`)
                }
                else if(hasRedeemed){
                    console.log(`Team ${input[1]} redeem gift`)
                }
                else{
                    console.log(`Team ${input[1]} has redeemed the gift`)
                }
                break;
            case "list":
                GiftsystemInstance.listRedeemed()
                break;
            case "left":
                GiftsystemInstance.RemainingTeamsToRedeem()
                break;
            case "exit":
                rl.close()
                return
            default:
                console.log("Invalid Command")
                break;
        }
        searchPrompt();
    });
}

