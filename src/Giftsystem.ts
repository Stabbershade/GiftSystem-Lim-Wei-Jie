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

    public lookUpStaffToTeam(staff_id: string): void {

        const lookup = this.staffToPassData.find((staff) => {
            return staff.staff_pass_id === staff_id
        })
        if (lookup) {
            console.log(`${staff_id} is from team ${lookup.team_name}`)
        }
        else {
            console.log(`${staff_id} do not exist`)
        }

    }

    public verifyRedemption(team_name: string): boolean {
        const lookup = this.redemptionData.find((redeemed) => {
            return redeemed.team_name === team_name
        })

        return !lookup
    }

    public addNewRedemption(team_name: string): void {
        if (this.verifyRedemption(team_name)) {
            this.redemptionData.push({
                team_name: team_name,
                redeemed_at: parseInt(String(Date.now()))
            })
            console.log(`Team: ${team_name} successfully redeemed`)
        }
        else {
            console.log(`Team: ${team_name} has already redeemed`)
        }
    }

    public listRedeemed(): void {
        this.redemptionData.forEach((data) => {
            console.log(`${data.team_name} has redeemed gift on ${new Date(parseInt(String(data.redeemed_at)))}`)
        })
    }

    public RemainingTeamsToRedeem(): void {
        let teamSet = new Set<string>()

        this.staffToPassData.forEach((data) => {
            teamSet.add(data.team_name)
        })

        this.redemptionData.forEach((data) => {
            if (teamSet.has(data.team_name)) {
                teamSet.delete(data.team_name)
            }
        })

        console.log(`Teams that didn't redeem yet: ${Array.from(teamSet)}`)
    }


}

export default GiftSystem;


