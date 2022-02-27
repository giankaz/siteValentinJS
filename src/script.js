import {dataBase} from './data/db.js'

const imgStand = document.querySelector('#imgStand')
const legendDiv = document.querySelector('#legend')


let counter = 1

function imgSwapper () {
      imgStand.innerHTML = ''

      const img = document.createElement('img')
      img.src = `./src/imgs/00${counter}.jfif`
      img.style.animation = 'roll-in-top 0.6s ease-out both'
      imgStand.appendChild(img)

      legendDiv.innerHTML = ''
    
      legendDiv.style.animation = 'puff-in-center 0.6s cubic-bezier(0.470, 0.000, 0.745, 0.715) both'
      const p = document.createElement('p')
      let imgFinder = `img${counter}`
      p.innerText = dataBase[imgFinder]
      legendDiv.appendChild(p)

      counter++
    if (counter ===  Object.keys(dataBase).length + 1) {
        counter = 1
    }    

    setTimeout(() => {
        legendDiv.style.animation = 'fade-out 0.6s ease-out both'
        img.style.animation = 'rotate-out-center 0.6s cubic-bezier(0.550, 0.085, 0.680, 0.530) both'
    }, 5000);
   
}

function loopFunction(delay, callback){

    let loop = function(){

        callback()
        setTimeout(loop, delay)
    }
    loop()
}

loopFunction(6000, imgSwapper);
