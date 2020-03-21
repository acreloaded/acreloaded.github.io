/* global $ */

function bvec (r, g, b) {
  return 'rgb(' + r + ',' + g + ',' + b + ')'
}

function getColor (c) {
  let color = 'white'
  // from /acr/source/src/rendertext.cpp
  switch (c) {
    case '0': color = bvec(2, 255, 128); break // green: player talk
    case '1': color = bvec(96, 160, 255); break // blue: team chat
    case '2': color = bvec(255, 192, 64); break // yellow: gameplay action messages, only actions done by players - 230 230 20 too bright
    case '3': color = bvec(255, 64, 64); break // red: important errors and notes
    case '4': color = bvec(128, 128, 128); break // gray
    // case '5': color = bvec(255, 255, 255); break // white
    case '6': color = bvec(96, 48, 0); break // dark brown
    case '7': color = bvec(153, 51, 51); break // dark red: dead admin
    case '8': color = bvec(192, 64, 192); break // magenta
    case '9': color = bvec(255, 102, 0); break // orange

    case 'm': color = bvec(0, 116, 57); break // dark green: dead master
    case 'o': color = bvec(31, 86, 166); break // dark blue: dead 'owner'

    // extendeded color palette
    // case 'a': case 'A': color = bvec( 0xFF, 0xCC, 0xCC); break // some lowercase seem to have special meaning like 'b' (flashing text) so not yet using them
    case 'A': color = bvec(0xff, 0xb7, 0xb7); break // red set
    case 'B': color = bvec(0xCC, 0x33, 0x33); break //
    case 'C': color = bvec(0x66, 0x33, 0x33); break //
    case 'D': color = bvec(0xF8, 0x98, 0x4E); break //

    case 'E': color = bvec(0xFF, 0xFF, 0xB7); break // yellow set
    case 'F': color = bvec(0xCC, 0xCC, 0x33); break //
    case 'G': color = bvec(0x66, 0x66, 0x33); break //
    case 'H': color = bvec(0xCC, 0xFC, 0x58); break //

    case 'I': color = bvec(0xB7, 0xFF, 0xB7); break // green set
    case 'J': color = bvec(0x33, 0xCC, 0x33); break //
    case 'K': color = bvec(0x33, 0x66, 0x33); break //
    case 'L': color = bvec(0x3F, 0xFF, 0x98); break //

    case 'M': color = bvec(0xB7, 0xFF, 0xFF); break // cyan set
    case 'N': color = bvec(0x33, 0xCC, 0xCC); break //
    case 'O': color = bvec(0x33, 0x66, 0x66); break //
    case 'P': color = bvec(0x4F, 0xCC, 0xF8); break //

    case 'Q': color = bvec(0xB7, 0xB7, 0xFF); break // blue set
    case 'R': color = bvec(0x33, 0x33, 0xCC); break //
    case 'S': color = bvec(0x33, 0x33, 0x66); break //
    case 'T': color = bvec(0xA0, 0x49, 0xFF); break //

    case 'U': color = bvec(0xFF, 0xB7, 0xFF); break // magenta set
    case 'V': color = bvec(0xCC, 0x33, 0xCC); break //
    case 'W': color = bvec(0x66, 0x33, 0x66); break //
    case 'X': color = bvec(0xFF, 0x01, 0xD5); break //

    case 'Y': color = bvec(0xC7, 0xD1, 0xE2); break // lt gray
    case 'Z': color = bvec(0x32, 0x32, 0x32); break // dark gray
    // white (provided color): everything else
    // default: color = bvec( 255, 255, 255 ); break;
  }
  return color
}

function updatePreview () {
  const $stuff = $('<div>')

  const parts = ('_' + $('#txt').val()).split('\\')
  const stack = [['f5', false]]
  let sp = 0
  for (let i = 0, l = parts.length; i < l; ++i) {
    if (!parts[i].length) continue

    let c = parts[i][0]
    let codeLen = 1
    if (c === 'n') {
      $stuff.append($('<br>'))
      continue
    } else if (c === 'f') {
      if (parts[i].length === 1) continue
      c = parts[i][codeLen++]
      // process color code
      if (c === 's') {
        stack.push(stack[sp++])
      } else if (c === 'r') {
        // ignore if stack is empty
        if (sp) {
          stack.pop()
          --sp
        }
      } else if (c === 'b') {
        stack[sp][1] ^= true
      } else {
        stack[sp] = [c, false]
      }
    }

    if (parts[i].length < codeLen) continue

    const text = parts[i].slice(codeLen)
    const color = getColor(stack[sp][0])
    const blinking = stack[sp][1]

    const $s = $('<span>')
      .text(text)
      .css('color', color)
    if (blinking) {
      $s.addClass('b')
    }
    $stuff.append($s)
  }

  $('#preview').empty().append($stuff)
}

$(function () {
  // register event listener
  $('#txt').on('change keyup', updatePreview)
  updatePreview()
})
