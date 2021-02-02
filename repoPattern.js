export default ({ fetch, storeHandler }) => {
  return {
    async getReferralLink(params) {
      return fetch({ url: '/v2/org//content-request/filters', params });
    },
    async getLinkFromStore() {
      return storeHandler.get('referral-link'); // NOT reactive (doesnt behave like a vuex store should)
    },

    /// VERY SIMILAR TO ApiService (basically does the same thing)
    async getReferralLinkFormatted(params) {
      if (storeHandler.get('referral-link')) return storeHandler.get('referral-link');
      try {
        let data = await this.getReferralLink(params);
        // data formatting here
        data = this._formatReferralLink(data);
        if (params.storeAction) storeHandler.set(params.storeAction, data);
        return Promise.success(data);
      } catch (error) {
        return Promise.reject(error);
      }
    },
    async postReferralLink(params) {
      const data = await fetch({ url: '/v2/org//content-request/filters', method: 'POST', params });
      if (params.storeAction) storeHandler.set(params.storeAction, data);
      return Promise.success(data);
    },
    async putReferralLink(params) {
      const data = await fetch({ url: '/v2/org//content-request/filters', method: 'PUT', params });
      if (params.storeAction) storeHandler.set(params.storeAction, data);
      return Promise.success(data);
    },
    async _formatReferralLink(data) {
      data = data.push('test');
    }
  };
};


export default {
  methods: {
    getReferral(){
      this.$repo.getReferralLinkFormatted({storeAction: 'setReferralLink'})
      .then((data) => {
        this.data = data;
      })
      .catch((error) => {
        this.loading = false;
      });
    }
  }
}
