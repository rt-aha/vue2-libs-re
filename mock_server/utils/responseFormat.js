// 回應非200時
function resError(errMessage) {
  return {
    code: -1,
    message: errMessage,
  };
}

// 回應200時
function resOk(data) {
  return {
    code: 0,
    data: data || '',
  };
}

// 回應200且有分頁時
function resOkWithPage(items, pageInfo, summary = {}) {
  return {
    code: 0,
    data: {
      items,
      pageInfo,
      summary,
    },
  };
}

export { resError, resOk, resOkWithPage };
