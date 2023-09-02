const puppeteer = require('puppeteer');
const bads = require('./breakingbad.json');

(async () => {
    try
    {

        const browser = await puppeteer.launch({headless: true,
            executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe',
            args:[
                '--start-maximized' // you can also use '--start-fullscreen'
            ],
            defaultViewport: null
        });
        const page = await browser.newPage();
    //  page.setDefaultTimeout(8000);

        for (let i=0; i<bads.length;i++){
            
                let number = Math.floor(Math.random() * 5);
                number++;
                await page.goto('https://forms.gle/gLFiPbL1ZFYvhK8Y8',{waitUntil: 'networkidle2'}).then(async (response) => {
                console.log(i+1 + ": Started")

            
                const nameSelector = await page.waitForSelector('#mG61Hd > div.RH5hzf.RLS9Fe > div > div.o3Dpx > div:nth-child(1) > div > div > div.AgroKb > div > div.aCsJod.oJeWuf > div > div.Xb9hP > input')
                await nameSelector.click()

                const name = bads[i].name === undefined ? bads[i].characterName : bads[i].name
                await page.keyboard.type(name); 
                
                const sizeSelector = await page.$$('#mG61Hd > div.RH5hzf.RLS9Fe > div > div.o3Dpx > div:nth-child(2) > div > div > div.oyXaNc > div:nth-child(2) > div > span > div > div:nth-child(2) > label')
                await sizeSelector[0].click() 

                const comments = await page.$x('//*[@id="mG61Hd"]/div[2]/div/div[2]/div[4]/div/div/div[2]/div/div[1]/div[2]/textarea')
                await comments[0].click()

                const nickname = bads[i].nickname === undefined ? bads[i].actorName : bads[i].nickname
                await page.keyboard.type(nickname); 
            
                const submit = await page.$$('#mG61Hd > div.RH5hzf.RLS9Fe > div > div.ThHDze > div.DE3NNc.CekdCb > div.lRwqcd > div > span')
                await submit[0].click()
                // https://theofficescript.com/random
                const wait = await page.waitForResponse("https://docs.google.com/forms/d/e/1FAIpQLSdRSKIu8aYIsxGYtRlp9qOMHLOBQUtzCVv9dFk-Wlv94nBrPw/formResponse").then(() => {
                    console.log("Submitted")
                });
            })
        }
    
        await browser.close() 
    
    }

    catch(error){
        console.log(error.message)
    }
})();