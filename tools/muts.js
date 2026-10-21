let mode = 0
let muts = 0

const GSP_START = 15
const GSP_NUM = 1
const NUM_MUTS = 16
const MUT_ALL = (1 << (NUM_MUTS + 1)) - 1

const MODES = [
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
  document.getElementById('mode').value = mode
  for (const $button of document.querySelectorAll('.btn-acr-mode')) {
    $button.classList.remove('active')
  }
  document.getElementById('mode' + mode).classList.add('active')
  for (let i = 0; i < GSP_NUM; ++i) {
    document.getElementById('mut' + (GSP_START + i)).textContent = MODES[mode][1 + i]
  }
}

function updateMutators () {
  document.getElementById('mut').value = muts
  for (let i = 0; i < NUM_MUTS; ++i) {
    document.getElementById('mut' + i).classList.toggle('active', !!(muts & (1 << i)))
  }
}

document.addEventListener('DOMContentLoaded', function () {
  const $mode = document.getElementById('mode')
  const $mut = document.getElementById('mut')

  // modes
  $mode.addEventListener('change', function () {
    mode = $mode.value % MODES.length
    if (mode < 0) mode += MODES.length
    updateMode()
  })
  for (let i = 0; i < MODES.length; ++i) {
    const button = document.getElementById('mode' + i)
    button.textContent = MODES[i][0]
    button.addEventListener('click', function () {
      mode = i
      updateMode()
    })
  }
  // mutators
  $mut.addEventListener('change', function () {
    muts = $mut.value & MUT_ALL
    updateMutators()
  })
  for (let i = 0; i < NUM_MUTS; ++i) {
    const $button = document.getElementById('mut' + i)
    const flag = 1 << i
    $button.addEventListener('click', function () {
      muts ^= flag
      updateMutators()
    })
  }

  // default mode
  mode = 2
  updateMode()
})
