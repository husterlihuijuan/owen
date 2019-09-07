import { checkStayData, checkStayDetail } from '@/services/stay';

const stayModel = {
  namespace: 'stay',
  state: {
    data: [],
    pageInfo: {},
    stayDetail: [],
  },
  effects: {
    *checkCurrentDate({ payload }, { call, put }) {
      const res = yield call(checkStayData, payload);
      yield put({
        type: 'update',
        payload: res,
      });
    },
    *checkStayDetail({ payload }, { call, put }) {
      const res = yield call(checkStayDetail, payload);
      const { data: stayDetail } = res;
      yield put({
        type: 'update',
        payload: { stayDetail },
      });
    },
  },
  reducers: {
    update(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
  },
};

export default stayModel;
