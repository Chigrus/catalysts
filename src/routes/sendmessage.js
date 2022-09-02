const nodemailer = require('nodemailer')

export async function post(req, res) {
    const {manager, producer, producerWeight, humidity, dryWeight, qotes, contentsPD, contentsPT, contentsRH, contentsPDgr, contentsPTgr, contentsRHgr, totalOneKG, totalPrice} = req.body.data;
    console.log(process.env.MAIL_LOGIN, process.env.MAIL_PASS);
    let transporter = nodemailer.createTransport({
        host: 'smtp.yandex.ru',
        port: 465,
        secure: true,
        auth: {
            user: process.env.MAIL_LOGIN,
            pass: process.env.MAIL_PASS,
        },
    })

    let mailOptions = {
        from: manager + ' ' + process.env.MAIL_LOGIN,
        to: process.env.MAIL_LOGIN,
        subject: 'Сообщение от пользователя '+manager,
        text: producer,
        html: `
            <table cellpadding="0" cellspacing="0" border="0" width="100%" style="background: #ffffff; min-width: 320px; font-size: 1px; line-height: normal;">
                <tr>
                    <td align="center" valign="top">
                        <table cellpadding="0" cellspacing="0" border="0" width="700" class="table700" style="max-width: 700px; min-width: 320px; background: #ffffff; border-width: 1px; border-style: solid; border-color: #000000; border-collapse: collapse;">
                            <tr>
                                <td align="center" valign="middle" colspan="4" style="border-width: 1px; border-style: solid; border-color: #000000; padding: 10px; background-color: #f6f6f6;">
                                    <span style="font-family: Arial, Tahoma, Geneva, sans-serif; color: #000000; font-size: 14px;">Поставщик: <b>${producer}</b></span>
                                </td>
                            </tr>
                            <tr>
                                <td align="center" valign="middle" colspan="2" style="border-width: 1px; border-style: solid; border-color: #000000; padding: 10px; text-align: left;">
                                    <span style="font-family: Arial, Tahoma, Geneva, sans-serif; color: #000000; font-size: 14px;">МАССА ПОСТАВЩИКА</span>
                                </td>					
                                <td align="center" valign="middle" colspan="2" style="border-width: 1px; border-style: solid; border-color: #000000; padding: 10px;">
                                    <span style="font-family: Arial, Tahoma, Geneva, sans-serif; color: #000000; font-size: 14px;">${producerWeight} кг</span>
                                </td>
                            </tr>
                            <tr>
                                <td align="center" valign="middle" style="border-width: 1px; border-style: solid; border-color: #000000; padding: 10px; text-align: left;">
                                    <span style="font-family: Arial, Tahoma, Geneva, sans-serif; color: #000000; font-size: 14px;">ВЛАЖНОСТЬ</span>
                                </td>					
                                <td align="center" valign="middle" style="border-width: 1px; border-style: solid; border-color: #000000; padding: 10px;">
                                    <span style="font-family: Arial, Tahoma, Geneva, sans-serif; color: #000000; font-size: 14px;">${humidity} %</span>
                                </td>					
                                <td align="center" valign="middle" style="border-width: 1px; border-style: solid; border-color: #000000; padding: 10px; text-align: left;">
                                    <span style="font-family: Arial, Tahoma, Geneva, sans-serif; color: #000000; font-size: 14px;">СУХАЯ МАССА</span>
                                </td>					
                                <td align="center" valign="middle" style="border-width: 1px; border-style: solid; border-color: #000000; padding: 10px;">
                                    <span style="font-family: Arial, Tahoma, Geneva, sans-serif; color: #000000; font-size: 14px;">${dryWeight} кг</span>
                                </td>
                            </tr>
                            <tr>
                                <td align="center" valign="middle" colspan="4" style="border-width: 1px; border-style: solid; border-color: #000000; padding: 10px; text-align: center; background-color: #f6f6f6;">
                                    <span style="font-family: Arial, Tahoma, Geneva, sans-serif; color: #000000; font-size: 14px;">LME - ОСНОВНЫЕ ПОКАЗАТЕЛИ НА ДАТУ ФИКСАЦИИ:</span>
                                </td>					
                            </tr>
                            <tr>
                                <td align="center" valign="middle" colspan="2" style="border-width: 1px; border-style: solid; border-color: #000000; padding: 5px; text-align: center; width: 33.333333333333%;">
                                    <span style="font-family: Arial, Tahoma, Geneva, sans-serif; color: #000000; font-size: 14px;"><b>PD</b> (руб/гр)</span>
                                </td>
                                <td align="center" valign="middle" style="border-width: 1px; border-style: solid; border-color: #000000; padding: 10px; text-align: center; width: 33.333333333333%;">
                                    <span style="font-family: Arial, Tahoma, Geneva, sans-serif; color: #000000; font-size: 14px;"><b>PT</b> (руб/гр)</span>
                                </td>
                                <td align="center" valign="middle" style="border-width: 1px; border-style: solid; border-color: #000000; padding: 10px; text-align: center; width: 33.333333333333%;">
                                    <span style="font-family: Arial, Tahoma, Geneva, sans-serif; color: #000000; font-size: 14px;"><b>RH</b> (руб/гр)</span>
                                </td>					
                            </tr>
                            <tr>
                                <td align="center" valign="middle" colspan="2" style="border-width: 1px; border-style: solid; border-color: #000000; padding: 5px; text-align: center; width: 33.333333333333%;">
                                    <span style="font-family: Arial, Tahoma, Geneva, sans-serif; color: #000000; font-size: 14px;">${qotes[0].value}</span>
                                </td>
                                <td align="center" valign="middle" style="border-width: 1px; border-style: solid; border-color: #000000; padding: 10px; text-align: center; width: 33.333333333333%;">
                                    <span style="font-family: Arial, Tahoma, Geneva, sans-serif; color: #000000; font-size: 14px;">${qotes[1].value}</span>
                                </td>
                                <td align="center" valign="middle" style="border-width: 1px; border-style: solid; border-color: #000000; padding: 10px; text-align: center; width: 33.333333333333%;">
                                    <span style="font-family: Arial, Tahoma, Geneva, sans-serif; color: #000000; font-size: 14px;">${qotes[2].value}</span>
                                </td>					
                            </tr>
                            <tr>
                                <td align="center" valign="middle" colspan="4" style="border-width: 1px; border-style: solid; border-color: #000000; padding: 10px; text-align: center; background-color: #f6f6f6;">
                                    <span style="font-family: Arial, Tahoma, Geneva, sans-serif; color: #000000; font-size: 14px;">СОДЕРЖАНИЕ ПО РЕЗУЛЬТАТАМ СПЕКТРАЛЬНОГО АНАЛИЗА:</span>
                                </td>					
                            </tr>
                            <tr>
                                <td align="center" valign="middle" colspan="2" style="border-width: 1px; border-style: solid; border-color: #000000; padding: 5px; text-align: center; width: 33.333333333333%;">
                                    <span style="font-family: Arial, Tahoma, Geneva, sans-serif; color: #000000; font-size: 14px;"><b>PD</b></span>
                                </td>
                                <td align="center" valign="middle" style="border-width: 1px; border-style: solid; border-color: #000000; padding: 10px; text-align: center; width: 33.333333333333%;">
                                    <span style="font-family: Arial, Tahoma, Geneva, sans-serif; color: #000000; font-size: 14px;"><b>PT</b></span>
                                </td>
                                <td align="center" valign="middle" style="border-width: 1px; border-style: solid; border-color: #000000; padding: 10px; text-align: center; width: 33.333333333333%;">
                                    <span style="font-family: Arial, Tahoma, Geneva, sans-serif; color: #000000; font-size: 14px;"><b>RH</b></span>
                                </td>					
                            </tr>
                            <tr>
                                <td align="center" valign="middle" colspan="2" style="border-width: 1px; border-style: solid; border-color: #000000; padding: 5px; text-align: center; width: 33.333333333333%;">
                                    <span style="font-family: Arial, Tahoma, Geneva, sans-serif; color: #000000; font-size: 14px;">${contentsPD} %</span>
                                </td>
                                <td align="center" valign="middle" style="border-width: 1px; border-style: solid; border-color: #000000; padding: 10px; text-align: center; width: 33.333333333333%;">
                                    <span style="font-family: Arial, Tahoma, Geneva, sans-serif; color: #000000; font-size: 14px;">${contentsPT} %</span>
                                </td>
                                <td align="center" valign="middle" style="border-width: 1px; border-style: solid; border-color: #000000; padding: 10px; text-align: center; width: 33.333333333333%;">
                                    <span style="font-family: Arial, Tahoma, Geneva, sans-serif; color: #000000; font-size: 14px;">${contentsRH} %</span>
                                </td>					
                            </tr>
                            <tr>
                                <td align="center" valign="middle" colspan="2" style="border-width: 1px; border-style: solid; border-color: #000000; padding: 5px; text-align: center; width: 33.333333333333%;">
                                    <span style="font-family: Arial, Tahoma, Geneva, sans-serif; color: #000000; font-size: 14px;">${contentsPDgr} гр</span>
                                </td>
                                <td align="center" valign="middle" style="border-width: 1px; border-style: solid; border-color: #000000; padding: 10px; text-align: center; width: 33.333333333333%;">
                                    <span style="font-family: Arial, Tahoma, Geneva, sans-serif; color: #000000; font-size: 14px;">${contentsPTgr} гр</span>
                                </td>
                                <td align="center" valign="middle" style="border-width: 1px; border-style: solid; border-color: #000000; padding: 10px; text-align: center; width: 33.333333333333%;">
                                    <span style="font-family: Arial, Tahoma, Geneva, sans-serif; color: #000000; font-size: 14px;">${contentsRHgr} гр</span>
                                </td>					
                            </tr>
                            <tr>
                                <td align="center" valign="middle" colspan="2" style="border-width: 1px; border-style: solid; border-color: #000000; padding: 10px; text-align: left;">
                                    <span style="font-family: Arial, Tahoma, Geneva, sans-serif; color: #000000; font-size: 14px;">ИТОГО ЗА КГ</span>
                                </td>					
                                <td align="center" valign="middle" colspan="2" style="border-width: 1px; border-style: solid; border-color: #000000; padding: 10px;">
                                    <span style="font-family: Arial, Tahoma, Geneva, sans-serif; color: #000000; font-size: 14px;">${totalOneKG} ₽</span>
                                </td>					
                            </tr>
                            <tr>
                                <td align="center" valign="middle" colspan="2" style="border-width: 1px; border-style: solid; border-color: #000000; padding: 10px; text-align: left; background-color: #f6f6f6;">
                                    <span style="font-family: Arial, Tahoma, Geneva, sans-serif; color: #000000; font-size: 14px;">ОБЩАЯ СТОИМОСТЬ</span>
                                </td>					
                                <td align="center" valign="middle" colspan="2" style="border-width: 1px; border-style: solid; border-color: #000000; padding: 10px; background-color: #f6f6f6;">
                                    <span style="font-family: Arial, Tahoma, Geneva, sans-serif; color: #000000; font-size: 14px;"><b>${totalPrice} ₽</b></span>
                                </td>					
                            </tr>
                            <tr>
                                <td align="center" valign="middle" colspan="2" style="border-width: 1px; border-style: solid; border-color: #000000; padding: 10px; text-align: left;">
                                    <span style="font-family: Arial, Tahoma, Geneva, sans-serif; color: #000000; font-size: 14px;">МЕНЕДЖЕР</span>
                                </td>					
                                <td align="center" valign="middle" colspan="2" style="border-width: 1px; border-style: solid; border-color: #000000; padding: 10px;">
                                    <span style="font-family: Arial, Tahoma, Geneva, sans-serif; color: #000000; font-size: 14px;"><b>${manager}</b></span>
                                </td>					
                            </tr>
                        </table>
                    </td>
                </tr>
            </table>
        `,
    };

    transporter.sendMail(mailOptions, (error, result) => {
        if (error) {
            console.log(error);
            res.end(JSON.stringify({status: false}));
        }else{
            console.log(result)    
            res.end(JSON.stringify({status: true}));
        }
    });
    
}