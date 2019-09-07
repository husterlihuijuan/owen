import request from 'umi-request';

export async function checkStayData(params) {
  return request('/api/check', {
    method: 'POST',
    data: params,
  });
}

export async function checkStayDetail(params) {
  return request('/api/stayDetail', { params });
}
