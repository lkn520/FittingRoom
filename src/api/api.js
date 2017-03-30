import axios from 'axios'

let DOMAIN = global.DOMAIN

// 轮播图
export const getCarousel = params => axios.get(`${DOMAIN}/Web/api?act=getCarouselList`, {params: params}).then(res => res.data)

// 首页推荐
export const getBrandRecommendCommodity = params => axios.get(`${DOMAIN}/Web/api?act=getHomeRecommendM2`, {params: params}).then(res => res.data)

// 一级分类
export const getTopCategory = params => axios.get(`${DOMAIN}/Web/api?act=getTopCategoryM2`, {params: params}).then(res => res.data)

// 获取分类商品 /Web/api?act=getCategoryGoods
export const getCategoryGoods = params => axios.get(`${DOMAIN}/Web/api?act=getCategoryGoods`, {params: params}).then(res => res.data)

// 获取搭配列表 /Web/api?act=getMatchListM2
export const getMatchList = params => axios.get(`${DOMAIN}/Web/api?act=getMatchListM2`, {params: params}).then(res => res.data)

// 获取我的搭配列表 /Web/api?act=getMyMatchListM2
export const getMyMatchList = params => axios.get(`${DOMAIN}/Web/api?act=getMyMatchListM2`, {params: params}).then(res => res.data)

// 我的收藏 /Web/api?act=getMyCollectGoodsListM2
export const getMyCollectGoodsList = params => axios.get(`${DOMAIN}/Web/api?act=getMyCollectGoodsListM2`, {params: params}).then(res => res.data)

// 收藏/取消收藏 /Web/api?act=collectM2
export const toggleCollect = params => axios.get(`${DOMAIN}/Web/api?act=collectM2`, {params: params}).then(res => res.data)

// 搭配详情 /Web/api?act=getMatchDetailM2
export const getMatchDetail = params => axios.get(`${DOMAIN}/Web/api?act=getMatchDetailM2`, {params: params}).then(res => res.data)

// 创建搭配 /Web/api?act=createUserMatchM2
export const createUserMatch = params => axios.get(`${DOMAIN}/Web/api?act=createUserMatchM2`, {params: params}).then(res => res.data)

export const testpost = params => axios.post('url', params).then(res => res.data)
