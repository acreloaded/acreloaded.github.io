/* global $ */

var m = 0
var NUM_MUTS = 16
var MUT_ALL = (1 << (NUM_MUTS + 1)) - 1

function updateMutators () {
  $('#mut').val(m)
  for (var i = 0; i < NUM_MUTS; ++i) {
    $('#mut' + i).toggleClass('active', !!(m & (1 << i)))
  }
}

$(function () {
  $('#mut').change(function () {
    m = $('#mut').val() & MUT_ALL
    updateMutators()
  })
  for (var i = 0; i < NUM_MUTS; ++i) {
    (function ($b, flag) {
      $b.click(function () {
        m ^= flag
        updateMutators()
      })
    })($('#mut' + i), (1 << i))
  }
})
