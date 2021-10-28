import { autosave, saveToLocal } from "./autosave";
import * as Storage from "$lib/ts/storage";
import * as Save from "$lib/ts/autosave";
import * as State from "$lib/ts/state";
import * as Auth from "$lib/ts/auth";
import * as Crier from '$lib/ts/crier' 
import type { User } from "@supabase/gotrue-js";



function deepCopy (array:Array<FrameT> & unknown):Array<FrameT> & unknown {
  return JSON.parse(JSON.stringify(array))
}

type KeypressArgsT = {
  userData:User
  event:KeyboardEvent
}
function handleKeypress(args:KeypressArgsT):void{
  // console.log(event)
  switch (args.event.key) {
    case 'a':
    if (args.event.ctrlKey){
      autosave({userData: args.userData})
      Crier.send({notification:'Select All'})
    }
    break
    case 'A': //ctrl+sht+a
    if (args.event.ctrlKey){
      autosave({userData: args.userData})
      Crier.send({notification:'Select All'})
    }
    break
    case 'y':
    if (args.event.ctrlKey){
      State.advance()
      Crier.send({notification:'Redo'})
    }
    break
    case 'z':
    if (args.event.ctrlKey){
      State.reverse(args.userData)
      Crier.send({notification:'Undo'})
      
    }
    break
    case 'Z':
    if (args.event.ctrlKey) {
      console.log('yay~')
      State.advance()
      Crier.send({notification:'Undo'})
    }
    break
    case 'Escape':
    autosave({userData: args.userData})
    Crier.send({notification:'Select None'})
    break
    case 'Delete':
    case 'Backspace':
    autosave({userData: args.userData})
    Crier.send({notification:'Cleared'})
    break
    case 'ArrowLeft':
      autosave({userData: args.userData})
    Crier.send({notification:'Nudge Left', duration:300, interrupt:true})
    break
    case 'ArrowRight':
      autosave({userData: args.userData})
    Crier.send({notification:'Nudge Right', duration:300, interrupt:true})
    break
    case 'ArrowUp':
      autosave({userData: args.userData})
    Crier.send({notification:'Nudge Up', duration:300, interrupt:true})
    break
    case 'ArrowDown':
      autosave({userData: args.userData})
    Crier.send({notification:'Nudge Down',duration:300, interrupt:true})
    break
    default:
    break
  }
}




// hey this needs to map over the filterlist instead of using css transforms

function touchZoomHandler (frameList:FrameT[], event:TouchEvent, startingScale:number):void {
  event.preventDefault()
  const transOptions:TransT =
  { transfomScale: 1.0
    , center: [200,200]
  }
  
  const pointer1 = event.targetTouches[0]
  const pointer2 = event.targetTouches[1]
  
  // const leftOffset = Math.abs(pointer1.clientX + pointer2.clientX)
  // const topOffset = Math.abs(pointer1.clientY + pointer2.clientY)
  
  const width = Math.abs(pointer1.clientX - pointer2.clientX)
  const height = Math.abs(pointer1.clientY - pointer2.clientY)
  
  // let scaleCenter = [width/2, height/2]
  
  // let scale = (width * height)
  
  transOptions.transfomScale = Math.sqrt(width ** 2 + height ** 2)
  const ratio = transOptions.transfomScale / startingScale
  
  // transOptions.center = [leftOffset/2, topOffset/2]
  
  // startingScale = width
}


export { 
   deepCopy
  , handleKeypress
  , touchZoomHandler
}