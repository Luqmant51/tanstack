const { checkboxItems } = require('../constants/checkboxItems.js')

function formatDate(d) {
  return d.toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' })
}

function createTestPortal(index = 0) {
  const id = index + 1
  const name = `Portal ${id}`

  const activeDate = new Date(2020, 0, 1 + index)

  const reportPreferences = Object.fromEntries(
    checkboxItems.map(item => [item.name, index % 3 === 0])
  )

  return {
    id,
    portalName: name,
    portalStatus: index % 2 === 0 ? 'Active' : 'InActive',

    portalInfo: {
      portalName: name,
      company: `Company ${index}`,
      activeDate,
      portalStatus: index % 2 === 0 ? 'Active' : 'InActive',
      check1: true,
      check2: true,
    },

    portalCredentials: {
      userName: `user${id}`,
      firstName: `First${id}`,
      lastName: `Last${id}`,
      email: `user${id}@example.com`,
      password: 'Test123!',
      confirmPassword: 'Test123!',
      check1: true,
    },

    reportPreferences,
  }
}

function createTestPortals(count = 5) {
  return Array.from({ length: count }, (_, i) => createTestPortal(i))
}

module.exports = {
  createTestPortal,
  createTestPortals,
}
