export const main= (req,res)=>{
    res.json({response:"Welcome to Торпеда Application Programming Interface!"});}
import { EventEmitter } from 'node:events';

export const emitter = new EventEmitter();