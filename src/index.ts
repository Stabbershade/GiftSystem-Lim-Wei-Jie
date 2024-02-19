import * as fs from 'fs';
import { parse } from 'csv-parse';

type StaffToPass = {
    staff_id : string,
    team_name: string,
    created_at: number
}

type Redemption = { 
    team_name: string,
    redeemed_at: number
}

