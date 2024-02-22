import * as fs from 'fs';
import { parse } from 'csv-parse';

type StaffToPass = {
    staff_pass_id: string,
    team_name: string,
    created_at: number
}

type Redemption = {
    team_name: string,
    redeemed_at: number
}

class GiftSystem {

    public staffToPassData: StaffToPass[] = []
    public redemptionData: Redemption[] = []
    public teamList: Set<string> = new Set<string>()

    /* 
	* @brief: Load Data from CSV with the header of staff_pass_id, team_name, created_at
    * @param: file_path: valid .csv file that is in the sample folder.
    * @return: Return a promise so that data is preloaded before prompting user action
    */
    public loadDataFromCSV(file_path: string): Promise<void> {
        return new Promise((resolve, reject) => {
            const header = ["staff_pass_id", "team_name", "created_at"]
            const fileContent = fs.readFileSync(file_path, { encoding: 'utf-8' })
            parse(fileContent, {
                delimiter: ",",
                columns: header,
                from_line: 2
            }, (error, result: StaffToPass[]) => {
                if (error) {
                    console.error(error);
                    console.log("Data unable to initilise")
                    reject(new Error("Data unable to be loaded from file"))
                }
                result.forEach((value: StaffToPass) => {
                    this.staffToPassData.push(value)
                    this.teamList.add(value.team_name)
                })
                console.log("Data Successfully Loaded")
                resolve()
            })
        })
    }

    /* 
	* @brief: Perform lookup with staff_id to team_name
    * @param: staff_id: valid staff_id, doesnt matter if lower case.
    * @return: Return either the mapped team_name or 
    *          Return null for invalid staff_id
    */
    public lookUpStaffToTeam(staff_id: string): string | null{
        const UpperStaffId = staff_id.toUpperCase()
        const lookup = this.staffToPassData.find((staff) => {
            return staff.staff_pass_id === UpperStaffId
        })
        return lookup ? lookup.team_name : null
    }

    /* 
	* @brief: Perform verification whether specify team is able to claim gift 
    * @param: team_name: valid team_name, doesnt matter if lower case.
    * @return: Return True for the mapped team_name that is able to claim gift or 
    *          Return False for the mapped team_name that is unable to claim gift
    *          Return null for invalid team_name
    */
    public verifyRedemption(team_name: string): boolean | null{
        const UpperTeamName = team_name.toUpperCase()
        if(!this.teamList.has(UpperTeamName)){
            return null
        }
        const lookup = this.redemptionData.find((redeemed) => {
            return redeemed.team_name === UpperTeamName
        })

        return !lookup
    }

    /* 
	* @brief: Perform operation of adding new redemption to database 
    * @param: team_name: valid team_name, doesnt matter if lower case.
    * @return: Return True for the mapped team_name that redeem the gift or 
    *          Return False for the mapped team_name that redeemed the gift before
    *          Return null for invalid team_name
    */
    public addNewRedemption(team_name: string): boolean | null{
        const UpperTeamName = team_name.toUpperCase()
        if (this.verifyRedemption(UpperTeamName) == null) {
            return null
        }
        if(this.verifyRedemption(UpperTeamName)){
            this.redemptionData.push({
                team_name: UpperTeamName,
                redeemed_at: parseInt(String(Date.now()))
            })
            return true
        }
        return false
    }

    /* 
	* @brief: List down all the teams that have redeemed gift with timestamp
    */
    public listRedeemed(): void {
        console.log("\n")
        this.redemptionData.forEach((data) => {
            console.log(`${data.team_name} has redeemed gift on ${new Date(parseInt(String(data.redeemed_at)))}`)
        })
    }

    /* 
	* @brief: List down all remaining teams that haven't redeemed gift
    */
    public RemainingTeamsToRedeem(): void {

        this.staffToPassData.forEach((data) => {
            this.teamList.add(data.team_name)
        })

        this.redemptionData.forEach((data) => {
            if (this.teamList.has(data.team_name)) {
                this.teamList.delete(data.team_name)
            }
        })

        if(this.teamList.size === 0){
            console.log(`\nAll teams have redeemed the gift!`)
        }
        else{
            console.log(`\nTeams that didn't redeem yet: ${Array.from(this.teamList)}`)
        }
    }


}

export default GiftSystem;


