import * as fs from 'fs';
import { parse } from 'csv-parse';
import { error } from 'console';

type StaffToPass = {
    staff_id : string,
    team_name: string,
    created_at: number
}

type Redemption = { 
    team_name: string,
    redeemed_at: number
}

class GiftSystem {
    private staffToPassData : StaffToPass[] = []
    private redemptionData : Redemption[] = []

    constructor(file:string){
        this.loadDataFromCSV(file)
    }

    private loadDataFromCSV(file_path: string): void {
        const fileContent = fs.readFileSync(file_path, { encoding: 'utf-8' })
        parse(fileContent , {
            delimiter: ",",
            columns : true,
        }, (error, result: StaffToPass) => {
            if (error) {
              console.error(error);
            }
            this.staffToPassData.push(result)
        }).on('end' , () =>{
            console.log("Data Successfully Loaded")
        })
    }
}

const system = new GiftSystem('./sample/staff-id-to-team-mapping.csv');

