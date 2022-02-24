const puppeteer = require('puppeteer')

// Creamos una función para extraer la información de cada coche y envolvemos en una promesa
const extractCarData = (link, browser) => new Promise (async (resolve, reject) => {

    try{
        // Creamos un objeto vacío donde almacenaremos la información de cada coche
        const carData={}
        // Abrimos una nueva pestaña
        const page = await browser.newPage()    

        // Accedemos al link de cada coche que nos llega por parámetros
        await page.goto(link)

        // Esperamos que aparezca alguno de los nodos con los que trabajaremos en el DOM, por ejemplo, la etiqueta h1
        await page.waitForSelector('h1')


        // utilizamos el método newPage.$eval(selector, function) y almacenamos en carData:
            

        carData['carTitle']= await page.$eval('div >  h1', title => title.innerText)
        carData['carPrice']= await page.$eval('#precio_con_finan', price => price.innerText)
        carData['carImg']= await page.$eval('#gallery > div.swiper-slide.swiper-slide-active > a > picture > img', img => img.src)
        // console.log(">carData", carData);
        resolve(carData) 
    }
    catch(err){
        // Devolvemos el error 
        reject({error:err})
    }
    
})

const scraper = async (url) => {
    try {
        // Creamos un array vacío scrapedData donde almacenaremos la información obtenida del scraping
        const scrapedData = []
        // inicializamos una instancia del navegador (browser) con puppeteer.launch() y añadimos en el objeto de configuración la opción headless
        console.log("Opening the browser......");
        const browser = await puppeteer.launch({headless: false})
        // Abrimos una nueva pestaña en el navegador creando una instancia con el método newPage() a la que llamaremos page
        const page = await browser.newPage()    
        // Indicamos la url que debe cargarse en la pestaña con page.goto(url)
        await page.goto(url)
        console.log(`Navigating to ${url}...`);

            await page.click("body > div.dwa-cms-ui-cookie.dwa-cms-ui-cookie--default.dwa-cms-ui-cookie--is-shown.dwa-cms-ui-cookie--is-visually-shown > div.dwa-cms-ui-cookie__outer > div.dwa-cms-ui-cookie__container > div.dwa-cms-ui-cookie__cta-wrapper > button.dwa-cms-ui-button.dwa-cms-ui-cookie__cta.dwa-cms-ui-cookie__accept-cta.dwa-cms-ui-cookie__accept-all.dwa-cms-ui-cookie__close-cta > p > span")
            await page.waitForSelector('.results-item-wrap')
       

        const urls = await page.$$eval('.file-item-cell > div > h2 > a',(links) => links.map(link => link.href))
        console.log('urls capturados', urls.length, urls );

        

        // Iteramos el array de urls con un bucle for/in y ejecutamos la promesa extractCarData por cada link en el array. Luego pusheamos el resultado a scraped data
         for(carLink in urls){
            const car = await extractCarData(urls[carLink], browser)
            scrapedData.push(car)
         }
        console.log(scrapedData, "Lo que devuelve mi función scraper", scrapedData.length)
       
        // cerramos el browser con el método 
        await browser.close()
        // Devolvemos el array con los resultados
        return scrapedData

    } catch (err) {
        console.log("Error:", err);
    }
}

//  scraper('https://www.dasweltauto.es/esp/')

 exports.scraper = scraper
// exportamos nuestra función scraper para poder hacer uso de ella en el controlador que corresponda