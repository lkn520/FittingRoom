import axios from 'axios'

let DOMAIN = global.DOMAIN

// 轮播图
export const getCarousel = params => axios.get(`${DOMAIN}/Web/api?act=getCarouselList`, {params: params}).then(res => res.data)

// 根据商品品牌获取推荐的商品
export const getBrandRecommendCommodity = params => axios.get(`${DOMAIN}/Web/api?act=brandRecommendCommodity`, {params: params}).then(res => res.data)

export const testpost = params => axios.post('url', params).then(res => res.data)
