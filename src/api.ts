const API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJYLUFwcC1SYXRlLUxpbWl0IjoiNTAwOjEwIiwiYWNjb3VudF9pZCI6IjEwOTExMzM5MTIiLCJhdXRoX2lkIjoiMiIsImV4cCI6MTY3NDIxODIwNiwiaWF0IjoxNjU4NjY2MjA2LCJuYmYiOjE2NTg2NjYyMDYsInNlcnZpY2VfaWQiOiI0MzAwMTE0ODEiLCJ0b2tlbl90eXBlIjoiQWNjZXNzVG9rZW4ifQ.oXNyt6Rnm_SWZISdygedwRNkerFoU55xbAxDj-oB3AY';

export interface IsearchUser{
  accessId: string,
  nickname: string,
  level: number
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





  