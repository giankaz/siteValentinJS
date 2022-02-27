import {dataBase} from './data/db.js'

const imgStand = document.querySelector('#imgStand')
const legendDiv = document.querySelector('#legend')


let counter = 1

function imgSwapper () {
      imgStand.innerHTML = ''

      const img = document.createElement('img')
      img.src = `./src/imgs/00${counter}.jfif`
      imgStand.appendChild(img)

      legendDiv.innerHTML = ''

      legendDiv.classList.remove('fade-out')
      legendDiv.classList.add('fade-in')
      const p = document.createElement('p')
      let imgFinder = `img${counter}`
      p.innerText = dataBase[imgFinder]
      legendDiv.appendChild(p)

      counter++
    if (counter ===  Object.keys(dataBase).length + 1) {
        counter = 1
    }    
    setInterval(() => {
        legendDiv.classList.remove('fade-in')
        legendDiv.classList.add('fade-out')

        img.classList.add('rotate-out-center')
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
