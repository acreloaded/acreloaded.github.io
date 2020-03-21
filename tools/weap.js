/* global $ */

const NUMGUNS = 19

// enum from /acr/source/src/entity.h
const MUL_NORMAL = 0
const MUL_SNIPER = 1
const MUL_SHOT = 2
const MUL_PRO = 3
const MUL_PRO2 = 4
// const MUL_NUM = 5

// mul muls[MUL_NUM] (from /acr/source/src/server.h)
const muls = [
  [ 1,  1.2, 5.5, 'General' ],
  [ 1,  1.4, 4.0, 'Sniper' ],
  [ 1,  1.3, 5.0, 'Shotgun' ],
  [ 0,  0.0, 1.0, 'Pro' ],
  [ 1, 10.0, 100, 'Pro2' ],
]

// guninfo guns[NUMGUNS] (from /acr/source/src/server.h)
const guns = [
  [ "knife",       0,  500, 80,   4,   5, 72, 100,   1,   0,   1,  0,  1, 0, 0,   0,   0, 100,  0, 3, true,  MUL_NORMAL ],
  [ "pistol",   1400,   90, 32,  24,  90,  8,   0,  90,  90,   9, 12, 13, 6, 2,  32,  48, 100, 70, 1, false, MUL_NORMAL ],
  [ "shotgun",   750,  200, 10,   6,  16,  7,   0, 190,   9,  12,  1,  6, 9, 5,  75,  83, 100,  5, 2, false, MUL_SHOT   ],
  [ "subgun",   2400,   67, 35,  20,  64, 20,   0,  70,  93,   4, 32, 33, 1, 3,  36,  60, 100, 65, 1, true,  MUL_NORMAL ],
  [ "sniper",   2000,  120, 45,  70, 110,  9,   0, 235,  96,  14, 20, 21, 4, 4,  65,  74, 100, 75, 2, false, MUL_SNIPER ],
  [ "assault",  2100,   73, 28,  45,  92,  9,   0,  65,  95,   3, 30, 31, 0, 3,  25,  42, 100, 60, 1, true,  MUL_NORMAL ],
  [ "grenade",  1000,  650, 220,  0,  55, 27,   0,   1,   0,   1,  0,  1, 3, 1,   0,   0, 100,  0, 3, false, MUL_NORMAL ],
  [ "pistol",   1400,   80, 32,  30,  90,  8,   0,  60,   0,   8, 24, 26, 6, 2,  28,  49, 100, 72, 2, true,  MUL_NORMAL ],
  [ "bolt",     2000, 1500, 120, 80, 130, 48,  40, 250,  97,  36,  8,  9, 4, 4, 110, 135, 100, 80, 3, false, MUL_SNIPER ],
  [ "heal",     1200,  100, 20,   4,   8, 10,   0,  50,   1,   1, 10, 11, 0, 0,  10,  20, 100,  8, 4, true,  MUL_NORMAL ],
  [ "sword",       0,  480, 90,   7,   9, 81, 100,   1,   0,   1,  0,  1, 0, 2,   0,   0, 100,  0, 0, true,  MUL_NORMAL ],
  [ "rpg",      2000,  120, 190,  0,  32, 15,  50, 200,  75,   3,  1,  1, 3, 1,  48,  50, 100,  0, 2, false, MUL_NORMAL ],
  [ "assault2", 2000,  100, 42,  48, 120, 12,   0, 150,  94,   3, 30, 31, 0, 3,  42,  62, 100, 62, 1, true,  MUL_NORMAL ],
  [ "sniper2",  2000,  120, 110, 75, 120, 45,  35, 300,  98, 120, 10, 11, 4, 4,  95,  96, 100, 85, 5, false, MUL_SNIPER ],
  [ "sniper3",  2100,  120, 36,  65, 100, 16,   0, 235,  96,   3, 20, 21, 0, 3,  47,  59, 100, 62, 1, true,  MUL_SNIPER ],
  [ "pistol2",  1400,  110, 42,  26,  96, 14,   0, 130,  92,  10,  7,  8, 6, 2,  48,  54, 100, 70, 1, false, MUL_NORMAL ],
  [ "assault",  2100,   73, 49,  45,  92,  9,   0,  65,  95,   3, 30, 31, 0, 3,  25,  42, 100, 60, 1, true,  MUL_PRO    ],
  [ "shotgun",   750,  200, 10,   6,  16,  7,   0, 190,   9,  12,  1,  6, 9, 5,  75,  83, 100,  5, 2, false, MUL_PRO    ],
  [ "assault",  2000,   75,  1,   0,   0,  0, 100,  65,  95,   3,600,601, 0, 3,  25,  42, 100, 60, 1, true,  MUL_PRO2   ],
]

// itemstat ammostats[NUMGUNS] (from /acr/source/src/server.h)
const ammostats = [
  [ 1, 1, 2 ],    // knife "dummy"
  [ 2, 5, 6 ],    // pistol
  [ 21, 28, 42 ], // shotgun
  [ 3, 4, 6 ],    // subgun
  [ 1, 2, 3 ],    // m21
  [ 3, 4, 6 ],    // m16
  [ 1, 1, 3 ],    // grenade
  [ 4, 0, 6 ],    // akimbo
  [ 2, 3, 4 ],    // bolt sniper
  [ 4, 6, 8 ],    // heal
  [ 1, 1, 1 ],    // sword dummy
  [ 1, 3, 4 ],    // RPG
  [ 3, 4, 6 ],    // ak47
  [ 2, 3, 4 ],    // m82
  [ 3, 4, 5 ],    // mk12
  [ 2, 5, 6 ],    // m1911
  [ 3, 4, 6 ],    // m16 pro
  [ 21, 28, 42 ], // shotgun pro
  [ 6, 8, 12 ],   // ACR pro
]

const weapnames = [
  'Knife',
  'USP',
  'M1014',
  'MP5',
  'M21',
  'M16A3',
  'M67',
  'Akimbo',
  'Intervention',
  'Heal',
  'Sword',
  'RPG-7',
  'AK-47',
  'M82',
  'MK12',
  'M1911',
  'M16 Pro',
  'M1014 Pro',
  'ACR Pro',
]

function formatDamage (damage, rangesub) {
  return rangesub
    ? damage + '-' + (damage - rangesub)
    : damage
}

function formatRange (range, endrange) {
  return range + '-' + endrange
}

function formatMag (addsize, magsize) {
  return `${addsize}${(addsize !== magsize ? ' +' + (magsize - addsize) : '')}`
}

function formatAmmo (ammoStart, ammoAdd, ammoMax) {
  return `${ammoAdd}/${ammoStart}/${ammoMax}`
}

$(function () {
  const $mult = $('#mult')
  for (const m of muls) {
    $mult.append(
      $('<tr>')
        .append($('<td>').text(m[3]))
        .append($('<td>').text(m[2]))
        .append($('<td>').text(m[1]))
        .append($('<td>').text(m[0]))
    )
  }

  const $weapStats = $('#weapStats')
  for (let i = 0; i < NUMGUNS; i++) {
    const name = weapnames[i]
    const [ammoStart, ammoAdd, ammoMax] = ammostats[i]
    const [
      modelname, reloadtime, attackdelay,
      damage, range, endrange, rangesub, piercing,
      spread, spreadrem, kick,
      addsize, magsize,
      mdl_kick_rot, mdl_kick_back,
      recoil, maxrecoil, recoilbackfade, recoilangle,
      pushfactor, isauto, mulset
    ] = guns[i]
    const mul = muls[mulset]

    const baseDamage = damage * (mulset === MUL_SHOT ? 24 : 1)
    const baseDPS = baseDamage * 1000 / attackdelay
    const shotsToKill = 100 / baseDamage
    const timeToKill = (Math.ceil(shotsToKill) - 1) * attackdelay / 1000
    $weapStats.append(
      $('<tr>')
        .append($('<td>').text(name))
        .append($('<td>').text(formatDamage(damage, rangesub)))
        .append($('<td>').text(formatRange(range, endrange)))
        .append($('<td>').text(attackdelay))
        .append($('<td>').text((60000 / attackdelay).toFixed(2)))
        .append($('<td>').text(isauto ? 'Yes' : 'No'))
        .append($('<td>').text(i ? formatMag(addsize, magsize) : 'N/A'))
        .append($('<td>').text(i ? formatAmmo(ammoStart, ammoAdd, ammoMax) : 'unlimited'))
        .append($('<td>').text(reloadtime / 1000))
        .append($('<td>').text(baseDPS.toFixed(2)))
        .append($('<td>').text(shotsToKill.toFixed(1)))
        .append($('<td>').text(timeToKill.toFixed(3)))
        .append($('<td>').text(mul[3]))
        .append($('<td>').text(piercing))
        .append($('<td>').text(spread))
        .append($('<td>').text(spreadrem))
        .append($('<td>').text(kick))
        .append($('<td>').text(recoil))
        .append($('<td>').text(maxrecoil))
        .append($('<td>').text(recoilbackfade))
        .append($('<td>').text(recoilangle))
        .append($('<td>').text(pushfactor))
    )
  }
})
