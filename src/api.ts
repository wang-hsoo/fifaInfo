const API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJYLUFwcC1SYXRlLUxpbWl0IjoiNTAwOjEwIiwiYWNjb3VudF9pZCI6IjEwOTExMzM5MTIiLCJhdXRoX2lkIjoiMiIsImV4cCI6MTY3NDIxODIwNiwiaWF0IjoxNjU4NjY2MjA2LCJuYmYiOjE2NTg2NjYyMDYsInNlcnZpY2VfaWQiOiI0MzAwMTE0ODEiLCJ0b2tlbl90eXBlIjoiQWNjZXNzVG9rZW4ifQ.oXNyt6Rnm_SWZISdygedwRNkerFoU55xbAxDj-oB3AY';

export interface IsearchUser{
  accessId: string,
  nickname?: string,
  level?: number
}

export async function searchUser(userName:string){
  return fetch(`https://api.nexon.co.kr/fifaonline4/v1.0/users?nickname=${userName}`, {headers:{Authorization:  API_KEY}}).then((response => response.json()))
}

export interface IuserDivision{
    matchType: number,
    division: number,
    achievementDate: string
}





export async function userMaxdivision(accessid:string){
  return fetch(`https://api.nexon.co.kr/fifaonline4/v1.0/users/${accessid}/maxdivision`, {headers:{Authorization:  API_KEY}}).then((response => response.json()))
  
  
}

export interface ImatchType{
  matchtype: number,
  desc: string
}

export async function matchType(){
  return fetch(`https://static.api.nexon.co.kr/fifaonline4/latest/matchtype.json`, {headers:{Authorization:  API_KEY}}).then((response => response.json()))
}

export interface IdivisionType{
  divisionId: number,
  divisionName: string
}

export async function divisionType(){
  return fetch(`https://static.api.nexon.co.kr/fifaonline4/latest/division.json`, {headers:{Authorization:  API_KEY}}).then((response => response.json()))
}


export interface IplayerBuy{
  tradeDate: string,
  saleSn: string,
  spid: number,
  grade: number,
  value: number,
}

export  async function palyerBuy(accessid:string){
  return fetch(`https://api.nexon.co.kr/fifaonline4/v1.0/users/${accessid}/markets?tradetype=buy&offset=0&limit=50`, {headers:{Authorization:  API_KEY}}).then((response => response.json()))
}

export async function playerSell(accessid:string){
  return fetch(`https://api.nexon.co.kr/fifaonline4/v1.0/users/${accessid}/markets?tradetype=sell&offset=0&limit=50`, {headers:{Authorization:  API_KEY}}).then((response => response.json()))
}

export interface IpalyerInfo{
  id: number,
  name: string
}

export async function palyerInfo(){
  return fetch(`https://static.api.nexon.co.kr/fifaonline4/latest/spid.json`, {headers:{Authorization:  API_KEY}}).then((response => response.json()))
}

export interface IseasonId{
  seasonId: number,
  className: string,
  seasonImg: string
}

export async function seasonId(){
  return fetch(`https://static.api.nexon.co.kr/fifaonline4/latest/seasonid.json`, {headers:{Authorization:  API_KEY}}).then((response => response.json()))
}


export async function userMatchCode(accessId:string, changeMatchMode:string){
  return fetch(`https://api.nexon.co.kr/fifaonline4/v1.0/users/${accessId}/matches?matchtype=${changeMatchMode}&offset=0&limit=10`, {headers:{Authorization:  API_KEY}}).then((response => response.json()))
}

interface shootDetal{
    goalTime: number,
    x: number,
    y: number,
    type: number,
    result: number,
    spId: number,
    spGrade: number,
    spLevel: number,
    spIdType: boolean,
    assist: boolean,
    assistSpId: number,
    assistX: number,
    assistY: number,
    hitPost: boolean,
    inPenalty: boolean

}

interface player{
  spId: number,
          spPosition: number,
          spGrade: number,
          status: {
                  shoot: number,
                  effectiveShoot: number,
                  assist: number,
                  goal: number,
                  dribble: number,
                  intercept: number,
                  defending: number,
                  passTry: number,
                  passSuccess: number,
                  dribbleTry: number,
                  dribbleSuccess: number,
                  ballPossesionTry: number,
                  ballPossesionSuccess: number,
                  aerialTry: number,
                  aerialSuccess: number,
                  blockTry: number,
                  block: number,
                  tackleTry: number,
                  tackle: number,
                  yellowCards: number,
                  redCards: number,
                  spRating: number
          }

}

interface matchInfoDetail{
  accessId: string,
  nickname: string,
  matchDetail: {
          seasonId: number,
          matchResult: string,
          matchEndType: number,
          systemPause: number,
          foul: number,
          injury: number,
          redCards: number,
          yellowCards: number,
          dribble: number,
          cornerKick: number,
          possession: number,
          offsideCount: number,
          averageRating: number,
          controller: string
  },
  shoot: {
    shootTotal: number,
    effectiveShootTotal: number,
    shootOutScore: number,
    goalTotal: number,
    goalTotalDisplay: number,
    ownGoal: number,
    shootHeading: number,
    goalHeading: number,
    shootFreekick: number,
    goalFreekick: number,
    shootInPenalty: number,
    goalInPenalty: number,
    shootOutPenalty: number,
    goalOutPenalty: number,
    shootPenaltyKick: number,
    goalPenaltyKick: number
},
shootDetail: shootDetal[],
pass: {
  passTry: number,
  passSuccess: number,
  shortPassTry: number,
  shortPassSuccess: number,
  longPassTry: number,
  longPassSuccess: number,
  bouncingLobPassTry: number,
  bouncingLobPassSuccess: number,
  drivenGroundPassTry: number,
  drivenGroundPassSuccess: number,
  throughPassTry: number,
  throughPassSuccess: number,
  lobbedThroughPassTry: number,
  lobbedThroughPassSuccess : number
},
defence: {
  blockTry: number,
  blockSuccess: number,
  tackleTry: number,
  tackleSuccess: number
},
player: player[],
  
}

export interface ImatchBasic{
    matchId: string,
    matchDate: string,
    matchInfo: matchInfoDetail[],
    matchType: number

}

export interface ImatchInfo{
  result: ImatchBasic
}

export async function matchInfo(matchList:any){

  const matchDetailInfo = [];
 
  for(let i = 0; i < matchList.length; i++){
    matchDetailInfo.push( 
        fetch(`https://api.nexon.co.kr/fifaonline4/v1.0/matches/${matchList[i]}`, {headers:{Authorization:  API_KEY}}).then((response => response.json()))
      )
    }

    
    const matchInfo = {
      info: matchDetailInfo
    }
  
  return matchInfo;
}


export interface IPosition{
  sppotition: number,
  desc: string
}

export async function position(){
  return fetch(`https://static.api.nexon.co.kr/fifaonline4/latest/spposition.json`, {headers:{Authorization:  API_KEY}}).then((response => response.json()))
}

  