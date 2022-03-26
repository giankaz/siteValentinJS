import {dataBase} from '../data/db.js'
import {Visitors} from './visits.js'

const site              = document.querySelector('.site')
const html              = document.querySelector('html')
const header            = document.querySelector('.header')
const h3                = document.querySelector('.showH3')

const imgStand          = document.querySelector('#imgStand')
const legendDiv         = document.querySelector('#legend')

const autoBtn           = document.createElement('button')
const allBtn            = document.createElement('a')
const randomBtn         = document.createElement('button')
const returnBtn         = document.createElement('button')

let condition           = false
let timer               = ''

legendDiv.style.display = 'none'        
returnBtn.innerText     = 'Retornar'

returnBtn.classList.add('homeBtn')

export class Main {  

    static counter = 1

    //função que escolhe uma foto aleatória da DB
    static randomPhoto ()  {
        imgStand.innerHTML  = ''
        legendDiv.innerHTML = ''

          let random = Math.floor(Math.random() * ((Object.keys(dataBase).length + 1) - 1) + 1)

        const modal          = document.createElement('div')

        modal.classList.add('modal')

            imgStand.appendChild(modal)

          let imgFinder      = `img${random}`

        const p              = document.createElement('p')
        p.innerText          = dataBase[imgFinder]

        p.classList.add('p1')

            imgStand.appendChild(p)

        const p2            = document.createElement('p')
        p2.innerText        = 'Clique na foto para fechar'

        p2.classList.add('p2')

            imgStand.appendChild(p2)

        const newImg           = document.createElement('img')

        if (random < 10) {
         newImg.src             = `./src/imgs/00${random}.jfif`
        } else {
         newImg.src             = `./src/imgs/0${random}.jfif`
        }

        newImg.classList.add('newImg')

            imgStand.appendChild(newImg)

                newImg.addEventListener('click', () =>{
                    html.style.overflow       = 'hidden'
                    site.style.overflow       = 'hidden'

                    imgStand.style.flexFlow   = 'column wrap'

                    condition                 = false

                        Main.loopFunction(1000, Main.imgSwapper, condition)

                    h3.innerText              = 'Escolha como deseja ver minhas fotos:'
                    h3.style.animation        = 'none'

                    imgStand.innerHTML        = ''
                    legendDiv.innerHTML       = ''
                    legendDiv.style.display   = 'none'

                        Main.home()

                    returnBtn.style.display   = 'none'   
                    returnBtn.style.animation = 'none'
                
                })
    }
    //função que mostra todas as fotos da DB
    static allPhotos () {
        imgStand.innerHTML      = ''
        legendDiv.innerHTML     = ''

        html.style.overflow     = 'visible'
      /*   site.style.overflow     = 'visible' */

        //h3.innerText            = 'Clique para ampliar !'
       // h3.style.animation      = 'puff-in-center 0.6s cubic-bezier(0.470, 0.000, 0.745, 0.715) both'

        imgStand.style.flexFlow = 'row wrap'

         for (let i = 1; i <  Object.keys(dataBase).length + 1; i++) {
            const img = document.createElement('img')
            if (i < 10) {
                img.src                = `../imgs/00${i}.jfif`
            } else {
                img.src                = `../imgs/0${i}.jfif`
            }
            img.style.width        = 100 + 'px'
            img.style.height       = 100 + 'px'
            img.style.marginRight  = 10 + 'px'
            img.style.marginBottom = 10 + 'px'
            img.style.animation    = 'roll-in-top 0.6s ease-out both'

            img.classList.add('imgs')

            img.addEventListener('click', () => {

                const modal                 = document.createElement('div')
                
                modal.classList.add('modal')

                    imgStand.appendChild(modal)

                let imgFinder = `img${i}`

                const p           = document.createElement('p')
                p.innerText       = dataBase[imgFinder]
                
                    p.classList.add('p1')

                    imgStand.appendChild(p)
                
                const newImg        = document.createElement('img')
                newImg.src          = img.src
                
                newImg.classList.add('newImg')

                    imgStand.appendChild(newImg)
               
                const p2            = document.createElement('p')
                p2.innerText        = 'Clique na foto para fechar'
                
                p2.classList.add('p2')

                    imgStand.appendChild(p2)
                
                        newImg.addEventListener('click', () =>{
                            imgStand.removeChild(newImg)
                            imgStand.removeChild(p)
                            imgStand.removeChild(p2)
                            imgStand.removeChild(modal)
                        })
            })

            imgStand.appendChild(img)
        }
    }
    //função pra trocar de imagens
    static imgSwapper (stopper) {

        if (stopper) {
           return 
        } else {

            h3.style.animation        = 'puff-in-center 0.6s cubic-bezier(0.470, 0.000, 0.745, 0.715) both'
            imgStand.innerHTML        = ''
        
            const img                 = document.createElement('img')

            if (Main.counter < 10) {
                img.src                   = `./src/imgs/00${Main.counter}.jfif`
            } else {
                img.src                = `./src/imgs/0${Main.counter}.jfif`
            }
           
            img.style.animation       = 'roll-in-top 0.6s ease-out both'

                imgStand.appendChild(img)
        
            legendDiv.innerHTML       = ''
            legendDiv.style.display   = 'flex'
            legendDiv.style.animation = 'puff-in-center 0.6s cubic-bezier(0.470, 0.000, 0.745, 0.715) both'

            const p                   = document.createElement('p')
            let imgFinder             = `img${Main.counter}`
            p.innerText               = dataBase[imgFinder]

                legendDiv.appendChild(p)
 
            Main.counter++

            if (Main.counter  ===  Object.keys(dataBase).length + 1) {
                Main.counter = 1
            }    
 
                setTimeout(() => {
                    legendDiv.style.animation = 'fade-out 0.6s ease-out both'
                    img.style.animation       = 'rotate-out-center 0.6s cubic-bezier(0.550, 0.085, 0.680, 0.530) both'
                }, 5000);
        }
     }
     //função recursiva
     static loopFunction(delay, callback, cond) {
         //criei condição pra encerrar a função
         if (cond === false) {
            //limpei o timeout e retornei ele ao valor inicial, retornei a função
             clearTimeout(timer)
             timer = ''
             return

         } else {
            //criei função que inicia o loop
            function loop (){
                callback()
                timer =  setTimeout(loop, delay)
            }
            //chamei a função pra gerar o loop usando o a variavel timer como timeout
            loop()
            } 
        } 
    //função home
     static home () {

         autoBtn.innerText         = 'Apresentação automática'
         autoBtn.style.animation   = 'puff-in-center 0.6s cubic-bezier(0.470, 0.000, 0.745, 0.715) both'

         autoBtn.classList.add('showBtn')

        
         allBtn.innerText          = 'Ver todas as fotos'
         allBtn.style.animation    = 'puff-in-center 0.6s cubic-bezier(0.470, 0.000, 0.745, 0.715) both'

         allBtn.classList.add('showBtn')


         randomBtn.innerText       = 'Ver uma foto aleatória'
         randomBtn.style.animation = 'puff-in-center 0.6s cubic-bezier(0.470, 0.000, 0.745, 0.715) both'

         randomBtn.classList.add('showBtn')

            imgStand.appendChild(autoBtn)
            imgStand.appendChild(allBtn)
            imgStand.appendChild(randomBtn)


         autoBtn.addEventListener('click', () => {

          returnBtn.style.display   = 'block'
          returnBtn.style.animation = 'puff-in-center 0.6s cubic-bezier(0.470, 0.000, 0.745, 0.715) both'

          h3.innerText              = 'Minhas fotos em ordem crescente!'

           header.appendChild(returnBtn)
                
                if (condition === false) {
                    condition = true
                    Main.loopFunction(6000, Main.imgSwapper, condition)
                }

     })
     allBtn.href = '../src/pages/allPhotos.html'
   
     
  /*     allBtn.addEventListener('click', () => {

        imgStand.innerHTML        = ''

        returnBtn.style.display   = 'block'
        returnBtn.style.animation = 'puff-in-center 0.6s cubic-bezier(0.470, 0.000, 0.745, 0.715) both'

        header.appendChild(returnBtn)

            Main.allPhotos()

     }) */ 
    
     randomBtn.addEventListener('click', () => {

            imgStand.innerHTML = ''

            returnBtn.style.display   = 'block'
            returnBtn.style.animation = 'puff-in-center 0.6s cubic-bezier(0.470, 0.000, 0.745, 0.715) both'
            
            header.appendChild(returnBtn)

                Main.randomPhoto()
        })
    }
    //div do esteve aqui
    static welcomeMessage () {
        const aside = document.querySelector('aside')

        setTimeout(() => aside.style.display  = 'none', 20000)

        document.addEventListener('submit', (event) => {
            event.preventDefault()

            let visitantName     = event.target.childNodes[3].value
            let newVisitor       = new Visitors(visitantName)
            //enviando visitante pra dataBase (future)
            newVisitor.visitantToDb()
        
            aside.innerHTML       = ''
            aside.style.animation = 'puff-in-center 0.6s cubic-bezier(0.470, 0.000, 0.745, 0.715) both'
            aside.innerText       = `Obrigado pela visita ${newVisitor.visitant}!`
        
                    setTimeout(() => {
                        aside.style.animation = 'fade-out 0.6s ease-out both'
                        setTimeout(() =>   aside.innerHTML = '', 1000)
                    }, 3000)
        })
    }
    //função do botão return
    static returner () {
        returnBtn.addEventListener ('click', () =>{
            html.style.overflow       = 'hidden'
            site.style.overflow       = 'hidden'
        
            imgStand.style.flexFlow   = 'column wrap'
        
            condition                 = false
        
               Main.loopFunction(1000, Main.imgSwapper, condition)
        
            h3.innerText              = 'Escolha como deseja ver minhas fotos:'
            h3.style.animation        = 'none'
        
            imgStand.innerHTML        = ''
            legendDiv.innerHTML       = ''
        
            legendDiv.style.display   = 'none'
        
                Main.home()
        
            returnBtn.style.display   = 'none'
            returnBtn.style.animation = 'none'
          
         })
    }
}
