import axios from 'axios'

let DOMAIN = global.DOMAIN

// 轮播图
export const getCarousel = params => axios.get(`${DOMAIN}/Web/api?act=getCarouselList`, {params: params}).then(res => res.data)

// 首页推荐
export const getBrandRecommendCommodity = params => axios.get(`${DOMAIN}/Web/api?act=getHomeRecommendM2`, {params: params}).then(res => res.data)

// 一级分类
export const getTopCategory = params => axios.get(`${DOMAIN}/Web/api?act=getTopCategoryM2`, {params: params}).then(res => res.data)

// 我的衣帽间
export const getMyCollectGoodsList = params => axios.get(`${DOMAIN}/Web/api?act=getMyCollectGoodsListM2`, {params: params}).then(res => res.data)

export const testpost = params => axios.post('url', params).then(res => res.data)
