
import { Message } from 'element-ui';

/**
 * 参数校验
 * @param {*参数对象} params 
 * @param {*指定需要校验的字段} necessarys 
 * @param {*指定校验字段的校验规则} msg 
 */

export function paramsValid(params,necessarys,msg){
    var status = true;
    for(var key in params){
        if(necessarys.includes(key)){
            var valid = msg[key]
            for(var i=0;i<valid.length;i++){
                // console.log('status',valid[i].reg,params[key],params,key);
                if(!valid[i].reg.test(params[key])){
                    console.log('aaaaaaaaaaaaaaaaaaaa')
                    Message({
                        message:valid[i].msg,
                        type:'error'
                    })
                    status = false;
                    break;
                }
                if(!status){
                    console.log('bbbbbbbbbbbbbbbbbbbbb')
                    break
                }
            }
        }
        if(!status){
            console.log('cccccccccccccccccccccc')
            break
        }
    }
    return status;
}

/**
 * 日期对象转 yyyy-MM-dd
 * @param {*} date 
 */
export function dealDate(date){
    var dates = new Date(date)
    var year = dates.getFullYear()
    var month = dates.getMonth() <10 ? dates.getMonth()+1: dates.getMonth()
    var days = dates.getDate()
    return year + '-' + month + '-' + days
}
/**
 * 日期对象转 yyyy-MM-dd HH:mm
 * @param {*} date 
 */
export function dealDatetime(date){
    var dates = new Date(date)
    var year = dates.getFullYear()
    var month = dates.getMonth() <10 ? dates.getMonth()+1: dates.getMonth()
    var days = dates.getDate()
    var hours = dates.getHours()
    var minute = dates.getMinutes()
    // var seconds = dates.getSeconds()
    return year + '-' + month + '-' + days + ' ' + hours + ':' + minute
}
  