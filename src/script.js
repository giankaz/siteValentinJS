import {dataBase} from './data/db.js'
import {Visitors} from './models/visits.js'

const imgStand = document.querySelector('#imgStand')
const legendDiv = document.querySelector('#legend')
const button1 = document.createElement('button')
button1.style.marginBottom = 10 + 'px'
const button2 = document.createElement('button')
const header = document.querySelector('.header')
const h3 = document.querySelector('.showH3')
const button3 = document.createElement('button')
button3.classList.add('homeBtn')
let condition = false
legendDiv.style.display = 'none'
button3.innerText = 'Retornar'

let timer = ''
class Main {
    static counter = 1
 
    static imgSwapper (stopper) {
        if (stopper) {
           console.log('not ok')
           return 'what'
        } else {
            h3.innerText = 'Minhas fotos em ordem crescente'
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
        
         button2.innerText = 'Ver todas as fotos'
         button2.classList.add('showBtn')
     
      imgStand.appendChild(button1)
      //imgStand.appendChild(button2)

      button1.addEventListener('click', () => {
          button3.style.display = 'block'
          header.appendChild(button3)
          
          if (condition === false) {
             condition = true
             Main.loopFunction(6000, Main.imgSwapper, condition)

          }
     }) 
    

     }

     
 }

const aside = document.querySelector('aside')
Main.photoShow()

button3.addEventListener ('click', () =>{
    condition = false
    Main.loopFunction(1000, Main.imgSwapper, condition)
    h3.innerText = 'Escolha como deseja ver minhas fotos:'
    imgStand.innerHTML = ''
    legendDiv.innerHTML = ''
    legendDiv.style.display = 'none'
    Main.photoShow()
    button3.style.display = 'none'
  

 })
//Main.loopFunction(6000, Main.imgSwapper)

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