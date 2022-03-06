import {dataBase} from './data/db.js'
import {Visitors} from './models/visits.js'


const body =document.querySelector('body')
const site = document.querySelector('.site')
const html = document.querySelector('html')
const imgStand = document.querySelector('#imgStand')
const legendDiv = document.querySelector('#legend')
const button1 = document.createElement('button')

const button2 = document.createElement('button')
const header = document.querySelector('.header')
const h3 = document.querySelector('.showH3')
const button3 = document.createElement('button')
const button4 = document.createElement('button')
button3.classList.add('homeBtn')
let condition = false
legendDiv.style.display = 'none'
button3.innerText = 'Retornar'

let timer = ''
export class Main {
    static counter = 1
    static randomPhoto ()  {
        imgStand.innerHTML = ''
        legendDiv.innerHTML = ''
        let random = Math.floor(Math.random() * ((Object.keys(dataBase).length + 1) - 1) + 1)

        const modal = document.createElement('div')
        modal.style.position = 'fixed'
        modal.style.width =  1000 + 'vw'
        modal.style.height = 1000 + 'vh'
        modal.style.backgroundColor = 'rgba(0,0,0,0.7)'
        modal.style.zIndex =  2
        imgStand.appendChild(modal)

        let imgFinder = `img${random}`
        const p = document.createElement('p')
        p.innerText = dataBase[imgFinder]
        p.style.position = 'fixed'
        p.style.zIndex = 4
        p.style.bottom = 30 + '%'
      
        p.style.textAlign = 'center'
        imgStand.appendChild(p)
        const p2 = document.createElement('p')
        p2.innerText = 'Clique na foto para fechar'
        p2.style.position = 'fixed'
        p2.style.zIndex = 4
        p2.style.bottom = 5 + '%'
        p2.style.fontWeight = 'bold'
        p2.style.textAlign = 'center'
        imgStand.appendChild(p2)

        const newImg = document.createElement('img')
        newImg.src = `./src/imgs/00${random}.jfif`
        newImg.style.width = 70 + '%'
        newImg.style.maxWidth = 500 + 'px'
        newImg.style.height = 50 + '%'
        newImg.style.position = 'fixed'
        newImg.style.top = 10 + '%'
        newImg.style.zIndex = 3
        newImg.style.animation = 'puff-in-center 0.6s cubic-bezier(0.470, 0.000, 0.745, 0.715) both'
        imgStand.appendChild(newImg)

        newImg.addEventListener('click', () =>{
            html.style.overflow = 'hidden'
            site.style.overflow = 'hidden'
            imgStand.style.flexFlow = 'column wrap'
            condition = false
            Main.loopFunction(1000, Main.imgSwapper, condition)
            h3.innerText = 'Escolha como deseja ver minhas fotos:'
            h3.style.animation = 'none'
            imgStand.innerHTML = ''
            legendDiv.innerHTML = ''
            legendDiv.style.display = 'none'
            Main.photoShow()
            button3.style.display = 'none'
            button3.style.animation = 'none'
          
        })
    }

    static allPhotos () {
        imgStand.innerHTML = ''
        legendDiv.innerHTML = ''
        html.style.overflow = 'visible'
        site.style.overflow = 'visible'

        h3.innerText = 'Clique para ampliar !'
        h3.style.animation = 'puff-in-center 0.6s cubic-bezier(0.470, 0.000, 0.745, 0.715) both'

        imgStand.style.flexFlow = 'row wrap'

        for (let i = 1; i <  Object.keys(dataBase).length + 1; i++) {
            const img = document.createElement('img')
            img.src = `./src/imgs/00${i}.jfif`
            img.style.width = 100 + 'px'
            img.style.height = 100 + 'px'
            img.style.marginRight = 10 + 'px'
            img.style.marginBottom = 10 + 'px'
            img.style.animation = 'roll-in-top 0.6s ease-out both'
            img.classList.add('imgs')
            img.addEventListener('click', () => {
                const modal = document.createElement('div')
                modal.style.position = 'fixed'
                modal.style.width =  1000 + 'vw'
                modal.style.height = 1000 + 'vh'
                modal.style.backgroundColor = 'rgba(0,0,0,0.7)'
                modal.style.zIndex =  2
                imgStand.appendChild(modal)

                
                let imgFinder = `img${i}`
                const p = document.createElement('p')
                p.innerText = dataBase[imgFinder]
                p.style.position = 'fixed'
                p.style.zIndex = 4
                p.style.bottom = 34 + '%'
              
                p.style.textAlign = 'center'
                imgStand.appendChild(p)
                
                const newImg = document.createElement('img')
                newImg.src = img.src
                newImg.style.width = 70 + '%'
                newImg.style.maxWidth = 500 + 'px'
                newImg.style.height = 50 + '%'
                newImg.style.position = 'fixed'
                newImg.style.top = 10 + '%'
                newImg.style.zIndex = 3
                newImg.style.animation = 'puff-in-center 0.6s cubic-bezier(0.470, 0.000, 0.745, 0.715) both'

                imgStand.appendChild(newImg)
               
                const p2 = document.createElement('p')
                p2.innerText = 'Clique na foto para fechar'
                p2.style.position = 'fixed'
                p2.style.zIndex = 4
                p2.style.bottom = 5 + '%'
                p2.style.fontWeight = 'bold'
                p2.style.textAlign = 'center'
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

    static imgSwapper (stopper) {
        if (stopper) {
           console.log('not ok')
           return 'what'
        } else {
            h3.style.animation = 'puff-in-center 0.6s cubic-bezier(0.470, 0.000, 0.745, 0.715) both'
       imgStand.innerHTML = ''
 
       const img = document.createElement('img')
       img.src = `./src/imgs/00${Main.counter}.jfif`
       img.style.animation = 'roll-in-top 0.6s ease-out both'
       imgStand.appendChild(img)
 
       legendDiv.innerHTML = ''
       legendDiv.style.display = 'flex'
     
       legendDiv.style.animation = 'puff-in-center 0.6s cubic-bezier(0.470, 0.000, 0.745, 0.715) both'
       const p = document.createElement('p')
       let imgFinder = `img${Main.counter}`
       p.innerText = dataBase[imgFinder]
       legendDiv.appendChild(p)
 
         Main.counter++
     if (Main.counter ===  Object.keys(dataBase).length + 1) {
         Main.counter = 1
     }    
 
     setTimeout(() => {
         legendDiv.style.animation = 'fade-out 0.6s ease-out both'
         img.style.animation = 'rotate-out-center 0.6s cubic-bezier(0.550, 0.085, 0.680, 0.530) both'
     }, 5000);
        }
     }
 
     static loopFunction(delay, callback, cond) {
         console.log(cond)
         if (cond === false) {
             console.log('here')
             clearTimeout(timer)
             timer = ''
             return
         } else {
            let loop = function(){
                callback()
                timer =  setTimeout(loop, delay)
            }
            loop()
            } 
        } 

     static photoShow () {

         button1.innerText = 'Apresentação automática'
         button1.classList.add('showBtn')
         button1.style.animation = 'puff-in-center 0.6s cubic-bezier(0.470, 0.000, 0.745, 0.715) both'
        
         button2.innerText = 'Ver todas as fotos'
         button2.classList.add('showBtn')
         button2.style.animation = 'puff-in-center 0.6s cubic-bezier(0.470, 0.000, 0.745, 0.715) both'

         button4.innerText = 'Ver uma foto aleatória'
         button4.classList.add('showBtn')
         button4.style.animation = 'puff-in-center 0.6s cubic-bezier(0.470, 0.000, 0.745, 0.715) both'

     

     
        imgStand.appendChild(button1)
        imgStand.appendChild(button2)
        imgStand.appendChild(button4)

         button1.addEventListener('click', () => {
          button3.style.display = 'block'
          button3.style.animation = 'puff-in-center 0.6s cubic-bezier(0.470, 0.000, 0.745, 0.715) both'
          header.appendChild(button3)
          h3.innerText = 'Minhas fotos em ordem crescente!'
          
          if (condition === false) {
             condition = true
             Main.loopFunction(6000, Main.imgSwapper, condition)

          }
     })
     
     button2.addEventListener('click', () => {
        imgStand.innerHTML = ''
        button3.style.display = 'block'
        button3.style.animation = 'puff-in-center 0.6s cubic-bezier(0.470, 0.000, 0.745, 0.715) both'
        header.appendChild(button3)

        Main.allPhotos()


     })
    
     button4.addEventListener('click', () => {
        imgStand.innerHTML = ''
        button3.style.display = 'block'
        button3.style.animation = 'puff-in-center 0.6s cubic-bezier(0.470, 0.000, 0.745, 0.715) both'
        header.appendChild(button3)

            Main.randomPhoto()
     })
     }

     
 }

Main.photoShow()

button3.addEventListener ('click', () =>{
    html.style.overflow = 'hidden'
    site.style.overflow = 'hidden'
    imgStand.style.flexFlow = 'column wrap'
    condition = false
    Main.loopFunction(1000, Main.imgSwapper, condition)
    h3.innerText = 'Escolha como deseja ver minhas fotos:'
    h3.style.animation = 'none'
    imgStand.innerHTML = ''
    legendDiv.innerHTML = ''
    legendDiv.style.display = 'none'
    Main.photoShow()
    button3.style.display = 'none'
    button3.style.animation = 'none'
  

 })

const aside = document.querySelector('aside')
setTimeout(() => {
    aside.style.display = 'none'
}, 10000)
document.addEventListener('submit', (event) => {
    event.preventDefault()
    let visitantName = event.target.childNodes[3].value
    let newVisitor = new Visitors(visitantName)
    newVisitor.visitantToDb()
  

    aside.innerHTML = ''
    aside.style.animation = 'puff-in-center 0.6s cubic-bezier(0.470, 0.000, 0.745, 0.715) both'
    aside.innerText = `Obrigado pela visita ${newVisitor.visitant}!`
 
    setTimeout(() => {
        aside.style.animation = 'fade-out 0.6s ease-out both'
        setTimeout(() =>   aside.innerHTML = '', 1000)
    }, 3000)
})