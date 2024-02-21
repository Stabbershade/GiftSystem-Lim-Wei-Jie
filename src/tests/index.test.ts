import GiftSystem from "../Giftsystem";
import sinon  from "sinon";

describe("GiftSystem Test", function () {
    let giftSystem: GiftSystem
    let dataTime : number
    beforeEach(() => {
        giftSystem = new GiftSystem();
        dataTime  = parseInt(String(Date.now()))
    })
    // describe('loadDataFromCSV', () => {})
    describe("lookUpStaffToTeam()", () => {
        test("Return teamname if staff_id exists", () => {
            giftSystem.staffToPassData = [
                { staff_pass_id: '1', team_name: 'TeamA', created_at: dataTime },
                { staff_pass_id: '2', team_name: 'TeamB', created_at: dataTime }
            ];

            const result = giftSystem.lookUpStaffToTeam('1');

            expect(result).toBe("TeamA");
        });

        test("Return null staff_id do not exist" , () => {
          giftSystem.staffToPassData = []

          const result = giftSystem.lookUpStaffToTeam('3');

          expect(result).toBeNull();
        })
    })

    describe('verifyRedemption()', () => {
        test('Return null if team do not exist', () => {
          giftSystem.teamList = new Set<string>(["TeamA"])
          giftSystem.redemptionData = [
            { team_name: 'TeamA', redeemed_at: dataTime }
          ];
    
          const result = giftSystem.verifyRedemption('TeamB');
          expect(result).toBeNull()
        });

        test('Return true if redemption data is not found', () => {
          giftSystem.teamList = new Set<string>(["TeamA","TeamB"])
          giftSystem.redemptionData = [
            { team_name: 'TeamA', redeemed_at: dataTime }
          ];
    
          const result = giftSystem.verifyRedemption('TeamB');
          expect(result).toBe(true);
        });
    
        test('Return false if redemption data is found', () => {
          giftSystem.teamList = new Set<string>(["TeamA"])
          giftSystem.redemptionData = [
            { team_name: 'TeamA', redeemed_at: dataTime }
          ];
    
          const result = giftSystem.verifyRedemption('TeamA');
          expect(result).toBe(false);
        });
      });

      describe('addNewRedemption()', () => {
        test('Return null to show that team does not exist', () => {
          const verifyRedemptionStub = sinon.stub(giftSystem, 'verifyRedemption').returns(null);
    
          const result = giftSystem.addNewRedemption('TeamJ');
    
          expect(giftSystem.redemptionData).toEqual([]);
          expect(result).toBeNull()
    
          verifyRedemptionStub.restore();
        });

        test('Return true to show new redemption if team has not redeemed before', () => {
          const verifyRedemptionStub = sinon.stub(giftSystem, 'verifyRedemption').returns(true);
    
          const result = giftSystem.addNewRedemption('TeamB');
    
          expect(giftSystem.redemptionData).toEqual([{ team_name: 'TeamB', redeemed_at: expect.any(Number) }]);
          expect(result).toBe(true);
    
          verifyRedemptionStub.restore();
        });
    
        test('Return false to show if team has already redeemed', () => {
          const verifyRedemptionStub = sinon.stub(giftSystem, 'verifyRedemption').returns(false);
    
          const result = giftSystem.addNewRedemption('TeamA');
    
          expect(giftSystem.redemptionData).toEqual([]);
          expect(result).toBe(false);
    
          verifyRedemptionStub.restore();
        });
      });

      describe('listRedeemed()', () => {
        test('Show list redeemed data', () => {
          giftSystem.redemptionData = [
            { team_name: 'TeamA', redeemed_at: dataTime }
          ];
          
          const consoleSpy = sinon.spy(console, 'log');
          giftSystem.listRedeemed();
    
          expect(consoleSpy.calledOnceWithExactly(`TeamA has redeemed gift on ${new Date(dataTime)}`)).toBe(true);
    
          consoleSpy.restore();
        });
      });

      describe('RemainingTeamsToRedeem()', () => {
        test('Show teams that have not redeemed yet', () => {
          giftSystem.staffToPassData = [
            { staff_pass_id: '1', team_name: 'TeamA', created_at: dataTime },
            { staff_pass_id: '2', team_name: 'TeamB', created_at: dataTime }
          ];
    
          giftSystem.redemptionData = [
            { team_name: 'TeamA', redeemed_at: dataTime }
          ];
    
          const consoleSpy = sinon.spy(console, 'log');
          giftSystem.RemainingTeamsToRedeem();
    
          expect(consoleSpy.calledOnceWithExactly('Teams that didn\'t redeem yet: TeamB')).toBe(true);
    
          consoleSpy.restore();
        });

        test('Show all teams have redeemed gift', () => {
          giftSystem.staffToPassData = [
            { staff_pass_id: '1', team_name: 'TeamA', created_at: dataTime },
            { staff_pass_id: '2', team_name: 'TeamB', created_at: dataTime }
          ];
    
          giftSystem.redemptionData = [
            { team_name: 'TeamA', redeemed_at: dataTime },
            { team_name: 'TeamB', redeemed_at: dataTime }
          ];
    
          const consoleSpy = sinon.spy(console, 'log');
          giftSystem.RemainingTeamsToRedeem();
    
          expect(consoleSpy.calledOnceWithExactly('All teams have redeemed the gift!')).toBe(true);
    
          consoleSpy.restore();
        });
      });
    
})