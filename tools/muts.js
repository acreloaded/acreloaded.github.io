/* global $ */

var mode = 0
var muts = 0

var GSP_START = 15
var GSP_NUM = 1
var NUM_MUTS = 16
var MUT_ALL = (1 << (NUM_MUTS + 1)) - 1

var MODES = [
  ['demo', 'gsp1'],
  ['coopedit', 'gsp1'],
  ['deathmatch', 'survivor'],
  ['capture the flag', 'direct'],
  ['secure the flag', 'direct'],
  ['hunt the flag', 'strict'],
  ['keep the flag', 'double'],
  ['bomber', 'demolition'],
  ['zombies', 'progressive'],
  ['overload', 'quick']
]

function updateMode () {
  $('#mode').val(mode)
  $('.btn-acr-mode').removeClass('active')
  $('#mode' + mode).addClass('active')
  for (var i = 0; i < GSP_NUM; ++i) {
    $('#mut' + (GSP_START + i)).text(MODES[mode][1 + i])
  }
}

function updateMutators () {
  $('#mut').val(muts)
  for (var i = 0; i < NUM_MUTS; ++i) {
    $('#mut' + i).toggleClass('active', !!(muts & (1 << i)))
  }
}

$(function () {
  // modes
  $('#mode').change(function () {
    mode = $('#mode').val() % MODES.length
    if (mode < 0) mode += MODES.length
    updateMode()
  })
  for (var i = 0; i < MODES.length; ++i) {
    (function (i) {
      $('#mode' + i)
        .text(MODES[i][0])
        .click(function () {
          mode = i
          updateMode()
        })
    })(i)
  }
  // mutators
  $('#mut').change(function () {
    muts = $('#mut').val() & MUT_ALL
    updateMutators()
  })
  for (i = 0; i < NUM_MUTS; ++i) {
    (function ($b, flag) {
      $b.click(function () {
        muts ^= flag
        updateMutators()
      })
    })($('#mut' + i), (1 << i))
  }

  // default mode
  $('#mode2').click()
})
