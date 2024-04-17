import {tokens} from '../db/controller.js'
export function isBetween(number,a, b, inclusive) {
    var min = Math.min(a, b),
        max = Math.max(a, b);
  
    return inclusive? number >= min && number <= max : number > min && number < max;
  };

export const authenticate =   async (req, res) => {
    try{
        return await tokens.matchesToken(req.cookies.auth_token);
    }
    catch(error){
      console.error(error)
      return null
    }
  };
