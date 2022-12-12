export const formatDate = (date: Date): string => {
    let today = new Date();
    let targetDate = new Date(date);
    let hours: string | number = targetDate.getHours();
    let minutes: string | number = targetDate.getMinutes();
    if (hours < 10) 
      hours = '0' + hours;
    if (minutes < 10) 
      minutes = '0' + minutes;
    let msInDay = 24 * 60* 60 * 1000;
    today.setHours(0,0,0,0);
    targetDate.setHours(0,0,0,0);
    let dif: string | number = (+today - +targetDate)/msInDay;
    if (dif === 0) 
      dif = 'Сегодня';
    if (dif === 1) 
      dif = 'Вчера';
    if (dif > 1) 
      dif = dif + ' дн. назад';
  
    return dif + ', ' + hours + ':' + minutes;
  }

export function findCorrespondingArr(arrId: any, arrAll: any[]): any {
  let newArr: any = [];
  arrId.forEach((id: any) => {
    newArr.push(arrAll.filter((item: any) => item._id === id)[0])     
  })
  return newArr
}

export function unique(arr: any) {
  let result: any = [];
  for (let str of arr) {
    if (!result.includes(str)) {
      result.push(str);
    }
  }
  return result;
}