// 获取时间差

function getInterval(start,end){
      let interval = end - start,
          day,hour,second,minute;

          interval /= 1000;

          day = Math.round(interval / 60 / 60 / 24);
          hour = Math.round(interval / 60 / 60 % 24);
          minute = Math.round(interval / 60 % 60);
          second = Math.round(interval % 60);
        
          return {
            day: day,
            hour: hour,
            minute: minute,
            second: second
          }
      
}

// 格式化时间
