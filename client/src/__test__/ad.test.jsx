import {ads, randomizedAdd} from '../components/Ad/Ad';
//Gustavs Test
describe('arrayContaining', () => {
    it('Ads should contain atleast 3 files', async () => {
        expect(ads.length).toBeLessThan(4);
       
      })
        it('Ads should contain atleast one image', async () => {
            expect(ads.length).toBeGreaterThan(0);
        
          })
      });
  
  