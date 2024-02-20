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
                GiftsystemInstance.lookUpStaffToTeam(input[1])
                break;
            case "redeem":
                GiftsystemInstance.addNewRedemption(input[1])
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

