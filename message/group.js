const {
	MessageType
} = require("@adiwajshing/baileys");
const fs = require("fs-extra")
const moment = require("moment-timezone")

const { getBuffer } = require('../lib/myfunc')
const { color, bgcolor } = require('../lib/color')

let setting = JSON.parse(fs.readFileSync('./setting.json'))
prefix = setting.prefix

module.exports = welcome = async (dha, anu) => {
	    const welkom = JSON.parse(fs.readFileSync('./database/group/welcome.json'))
	    const isWelcome = welkom.includes(anu.jid)
	    if (!isWelcome) return
		try {
			    mem = anu.participants[0]
			    console.log(anu)
                try {
                pp_user = await dha.getProfilePicture(mem)
                } catch (e) {
                pp_user = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png?q=60'
            }
                try {
                pp_grup = await dha.getProfilePicture(anu.jid)
                } catch (e) {
                pp_grup = 'https://i.postimg.cc/SN54m6LW/SAVE-20210728-133334.jpg'
            }
            if (anu.action == 'add' && mem.includes(dha.user.jid)) {
            dha.sendMessage(anu.jid, 'Halo! Terima Kasih sudah Mengundangku, Jika ingin Menggunakan Bot Ketik ${prefix}menu', 'conversation')
            }
             if (anu.action == 'add' && !mem.includes(dha.user.jid)) {
             if (!welkom.includes(anu.jid)) return
                mdata = await dha.groupMetadata(anu.jid)
                memeg = mdata.participants.length
            	num = anu.participants[0]
                let v = dha.contacts[num] || { notify: num.replace(/@.+/, '') }
                anu_user = v.vname || v.notify || num.split('@')[0]
                time_wel = moment.tz('Asia/Jakarta').format("HH:mm")
                teks = `----------- [ *WELCOME* ] ----------- \n\n*HALO* @${num.split('@')[0]} \nsaya *ZHICCO BOTZ* \n\n*SELAMAT DATANG DI GRUP* : ${mdata.subject} \nJUMLAH MEMBER : ${memeg} \n\nIntro Dulu Ya Biar Kenal\n=> *Nama*:\n=> *Umur*:\n=> *Askot*:\n\nSemoga Betah ^_^`
	            buff = await getBuffer(`http://hadi-api.herokuapp.com/api/card/Welcome?nama=${anu_user}&descriminator=${time_wel}&memcount=${memeg}&gcname=${encodeURI(mdata.subject)}&pp=${pp_user}&bg=https://i.postimg.cc/rFkw8MpX/IMG-20210807-151325.jpg`)
                buttons = [{buttonId: `#y`,buttonText:{displayText: 'SIAP BANG'},type:1}]
                imageMsg = (await dha.prepareMessageMedia((buff), 'imageMessage', {thumbnail: buff})).imageMessage
                buttonsMessage = { contentText: `${teks}`, footerText: '©ZHICCO Official | ZHICCO Botz', imageMessage: imageMsg, buttons: buttons, headerType: 4 }
                prep = await dha.prepareMessageFromContent(mdata.id,{buttonsMessage},{})
                dha.relayWAMessage(prep)
}
            if (anu.action == 'remove' && !mem.includes(dha.user.jid)) {
            if (!welkom.includes(anu.jid)) return
                mdata = await dha.groupMetadata(anu.jid)
            	num = anu.participants[0]
                let w = dha.contacts[num] || { notify: num.replace(/@.+/, '') }
                anu_user = w.vname || w.notify || num.split('@')[0]
                time_wel = moment.tz('Asia/Jakarta').format("HH:mm")
                memeg = mdata.participants.length
                out = `*Byeee*......\n==> @${num.split('@')[0]}\n*Keluar Pada Jam* : *${time_wel}* \n\n*sayonara:)* \n *Tersisa ${memeg} Member Grup Lagi*`
                buff = await getBuffer(`http://hadi-api.herokuapp.com/api/card/GoodBye?nama=${anu_user}&descriminator=${time_wel}&memcount=${memeg}&gcname=${encodeURI(mdata.subject)}&pp=${pp_user}&bg=https://i.postimg.cc/rFkw8MpX/IMG-20210807-151325.jpg`)
                buttons = [{buttonId: `#t`,buttonText:{displayText: 'GOD BYE'},type:1}]
                imageMsg = (await dha.prepareMessageMedia((buff), 'imageMessage', {thumbnail: buff})).imageMessage
                buttonsMessage = { contentText: `${out}`, footerText: '©𝘽𝘼𝘽𝙔 Official | 𝘽𝘼𝘽𝙔 BOTZ', imageMessage: imageMsg, buttons: buttons, headerType: 4 }
                prep = await dha.prepareMessageFromContent(mdata.id,{buttonsMessage},{})
                dha.relayWAMessage(prep)
            }
		} catch (e) {
			console.log('Error : %s', color(e, 'red'))
		}
	}