// 引入mock
import Mock from "mockjs";
// 引入json数据  webpack默认暴露json数据、图片
import banner from '@/mock/banner.json'
import floor from '@/mock/floor.json'

//模拟轮播图
Mock.mock('/mock/banner', { code: 200, data: banner })
    //模拟家用电器
Mock.mock('/mock/floor', { code: 200, data: floor })