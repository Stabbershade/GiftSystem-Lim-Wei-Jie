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
                }
                result.forEach((value: StaffToPass) => {
                    this.staffToPassData.push(value)
                    this.teamList.add(value.team_name)
                })
            }).on('end', () => {
                console.log("Data Successfully Loaded")
                resolve()
            }).on('error', (err) => {
                console.log("Data unable to initilise")
                reject(err)
            })
        })
    }

    public lookUpStaffToTeam(staff_id: string): string | null{

        const lookup = this.staffToPassData.find((staff) => {
            return staff.staff_pass_id === staff_id
        })
        return lookup ? lookup.team_name : null
    }

    public verifyRedemption(team_name: string): boolean | null{
        if(!this.teamList.has(team_name)){
            return null
        }
        const lookup = this.redemptionData.find((redeemed) => {
            return redeemed.team_name === team_name
        })

        return !lookup
    }

    public addNewRedemption(team_name: string): boolean | null{
        if (this.verifyRedemption(team_name) == null) {
            return null
        }
        if(this.verifyRedemption(team_name)){
            this.redemptionData.push({
                team_name: team_name,
                redeemed_at: parseInt(String(Date.now()))
            })
            return true
        }
        return false
    }

    public listRedeemed(): void {
        this.redemptionData.forEach((data) => {
            console.log(`${data.team_name} has redeemed gift on ${new Date(parseInt(String(data.redeemed_at)))}`)
        })
    }

    public RemainingTeamsToRedeem(): void {

        this.staffToPassData.forEach((data) => {
            this.teamList.add(data.team_name)
        })

        this.redemptionData.forEach((data) => {
            if (this.teamList.has(data.team_name)) {
                this.teamList.delete(data.team_name)
            }
        })

        console.log(`Teams that didn't redeem yet: ${Array.from(this.teamList)}`)
    }


}

export default GiftSystem;


