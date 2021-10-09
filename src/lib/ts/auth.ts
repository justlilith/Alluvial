import { SupabaseClient } from '@supabase/supabase-js'
import type { User, Session } from '@supabase/gotrue-js'

const supabase = new SupabaseClient('https://bqljggidsuurzwjgspix.supabase.co','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYzMzc2MTI0MywiZXhwIjoxOTQ5MzM3MjQzfQ.lQzW2bbkwkN4IPf0QqJVHkTh_YJdd9mATglBUktRBpA',{})

let loggedIn:boolean
let userData:User
let sessionData:Session

const LogInWithEmail = async (args):Promise<Array<User|Session|Error>> => {
  const { user, session, error} = await supabase.auth.signIn({
    password: args.password
    , email: args.email
  })
  if (!error) {
    loggedIn = true
    userData = user
    sessionData = session
  }
  return [user, session, error]
}

const signUpWithEmail = async (args):Promise<Array<User|Session|Error>> => {
  const { user, session, error} = await supabase.auth.signUp({
    password: args.password
    , email: args.email
  })
  if (!error){
    loggedIn = true
    sessionData = session
    const {user, error} = await supabase.auth.update({data: {name: args.name}})
    if (!error){
      userData = user
    }
  }
  return [user, session, error]
}

// const signUpWithPhone = async (args):Promise<Array<User|Session|Error>> => {
//   const { user, session, error} = await supabase.auth.signUp({
//     phone: args.phone
//     , password: args.password
//     , email: args.email
//   })
//   return [user, session, error]
// }

export {
  loggedIn
  , LogInWithEmail
  , sessionData
  , signUpWithEmail
  // , signUpWithPhone
  , userData
}