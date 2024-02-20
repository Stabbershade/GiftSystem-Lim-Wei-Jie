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
        test("Show teamname if staff_id exists", () => {
            giftSystem.staffToPassData = [
                { staff_pass_id: '1', team_name: 'TeamA', created_at: dataTime },
                { staff_pass_id: '2', team_name: 'TeamB', created_at: dataTime }
            ];

            const consoleSpy = sinon.spy(console, 'log');
            giftSystem.lookUpStaffToTeam('1');
            expect(consoleSpy.calledOnceWithExactly('1 is from team TeamA')).toBe(true);

            consoleSpy.restore();
        });

        test("Show staff_id do not exist" , () => {
            const consoleSpy = sinon.spy(console, 'log');

            giftSystem.lookUpStaffToTeam('3');

            expect(consoleSpy.calledOnceWithExactly('3 do not exist')).toBe(true);

            consoleSpy.restore();
        })
    })

    describe('verifyRedemption()', () => {
        test('Return true if redemption data is not found', () => {
          giftSystem.redemptionData = [
            { team_name: 'TeamA', redeemed_at: dataTime }
          ];
    
          const result = giftSystem.verifyRedemption('TeamB');
          expect(result).toBe(true);
        });
    
        test('Return false if redemption data is found', () => {
          giftSystem.redemptionData = [
            { team_name: 'TeamA', redeemed_at: dataTime }
          ];
    
          const result = giftSystem.verifyRedemption('TeamA');
          expect(result).toBe(false);
        });
      });

      describe('addNewRedemption()', () => {
        test('Show new redemption if team has not redeemed before', () => {
          const verifyRedemptionStub = sinon.stub(giftSystem, 'verifyRedemption').returns(true);
          const consoleSpy = sinon.spy(console, 'log');
    
          giftSystem.addNewRedemption('TeamB');
    
          expect(giftSystem.redemptionData).toEqual([{ team_name: 'TeamB', redeemed_at: expect.any(Number) }]);
          expect(consoleSpy.calledOnceWithExactly('Team: TeamB successfully redeemed')).toBe(true);
    
          verifyRedemptionStub.restore();
          consoleSpy.restore();
        });
    
        test('Show new redemption if team has already redeemed', () => {
          const verifyRedemptionStub = sinon.stub(giftSystem, 'verifyRedemption').returns(false);
          const consoleSpy = sinon.spy(console, 'log');
    
          giftSystem.addNewRedemption('TeamA');
    
          expect(giftSystem.redemptionData).toEqual([]);
          expect(consoleSpy.calledOnceWithExactly('Team: TeamA has already redeemed')).toBe(true);
    
          verifyRedemptionStub.restore();
          consoleSpy.restore();
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
      });
    
})