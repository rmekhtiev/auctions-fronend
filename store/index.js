// todo: persisr between reloads
// import createPersistedState from 'vuex-persistedstate'

export const strict = false

export default {
  // plugins: [createPersistedState()],

  state: () => ({
    openSalesroomIds: [],
  }),

  mutations: {
    OPEN_SALESROOM(state, auctionId) {
      const index = state.openSalesroomIds.indexOf(auctionId)

      if (!(index > -1)) {
        state.openSalesroomIds.push(auctionId)
      }
    },

    CLOSE_SALESROOM(state, auctionId) {
      const index = state.openSalesroomIds.indexOf(auctionId)

      if (index > -1) {
        state.openSalesroomIds.splice(index, 1)
      }
    },
  },

  actions: {
    openSalesroom({ commit }, { id }) {
      if (!id) {
        throw new Error('Cannot open empty')
      }

      commit('OPEN_SALESROOM', id)
    },

    closeSalesroom({ commit }, { id }) {
      commit('CLOSE_SALESROOM', id !== null ? id : null)
    },
  },

  getters: {
    openSalesrooms(state, getters) {
      return state.openSalesroomIds.map((id) =>
        getters['auctions/byId']({ id })
      )
    },
  },
}
