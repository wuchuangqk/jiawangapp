import $ from 'jquery';
interface LogMessage {
    first: string;
    keyword2?: string;
    keyword1?: string;
    remark?: string;
}
/*
 * app错误日志 收集提醒
 */
export function sendLog(data: LogMessage) {
    $.ajax({
        type: 'post',
        contentType: 'application/json',
        url: 'http://122.51.157.236:1088/api/system/wx/pushMessage',
        data: JSON.stringify({
            OpenIdList: ['ozoyrwUegNG0rbo8B7n7R9as7aOE', 'ozoyrwdxuNZVrWUca_4z5oe7VaYQ'],
            first: data.first,
            keyword2: data.keyword2,
            keyword1: data.keyword1,
            remark: data.remark,
        }),
        dataType: 'json'
    });
}
