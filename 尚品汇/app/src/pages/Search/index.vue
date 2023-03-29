<template>
  <div>
    <TypeNav />
    <div class="main">
      <div class="py-container">
        <!--bread-->
        <!-- 面包屑  -->
        <div class="bread">
          <ul
            class="fl sui-breadcrumb"
            v-show="
              searchParams.categoryName ||
              searchParams.keyword ||
              searchParams.trademark ||
              searchParams.props.length
            "
          >
            <li>
              <a href="#">全部结果</a>
            </li>
          </ul>
          <ul class="fl sui-tag">
            <!-- 面包屑：分类名称、关键字、品牌、配置属性 -->
            <li class="with-x" v-show="searchParams.categoryName">
              {{ searchParams.categoryName
              }}<i @click="removeCategoryName">×</i>
            </li>
            <li class="with-x" v-show="searchParams.keyword">
              {{ searchParams.keyword }}<i @click="removeKeyword">×</i>
            </li>
            <li class="with-x" v-show="searchParams.trademark">
              {{ searchParams.trademark.split(':')[1]
              }}<i @click="removeTrademark">×</i>
            </li>
            <li
              class="with-x"
              v-for="(attr, index) in searchParams.props"
              :key="index"
            >
              {{ attr.split(':')[1] }}<i @click="removeAttr(index)">×</i>
            </li>
          </ul>
        </div>

        <!--selector-->
        <SearchSelector @trademarkInfo="trademarkInfo" @attrInfo="attrInfo" />

        <!--details-->
        <div class="details clearfix">
          <!-- 排序 -->
          <div class="sui-navbar">
            <div class="navbar-inner filter">
              <ul class="sui-nav">
                <li :class="{ active: isOne }" @click="changeOrder(1)">
                  <a
                    >综合
                    <span
                      v-show="isOne"
                      class="iconfont"
                      :class="{ 'icon-down': isDown, 'icon-up': !isDown }"
                    ></span
                  ></a>
                </li>
                <li :class="{ active: !isOne }" @click="changeOrder(2)">
                  <a
                    >价格
                    <span
                      v-show="!isOne"
                      class="iconfont"
                      :class="{ 'icon-down': isDown, 'icon-up': !isDown }"
                    ></span
                  ></a>
                </li>
              </ul>
            </div>
          </div>
          <div class="goods-list">
            <ul class="yui3-g">
              <li class="yui3-u-1-5" v-for="good in goodsList" :key="good.id">
                <div class="list-wrap">
                  <div class="p-img">
                    <router-link :to="`/detail/${good.id}`">
                      <img v-lazy="good.defaultImg" />
                    </router-link>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥ </em>
                      <i>{{ good.price }}</i>
                    </strong>
                  </div>
                  <div class="attr">
                    <a target="_blank" href="item.html" :title="good.title">{{
                      good.title
                    }}</a>
                  </div>
                  <div class="commit">
                    <i class="command">已有<span>2000</span>人评价</i>
                  </div>
                  <div class="operate">
                    <a
                      href="success-cart.html"
                      target="_blank"
                      class="sui-btn btn-bordered btn-danger"
                      >加入购物车</a
                    >
                    <a href="javascript:void(0);" class="sui-btn btn-bordered"
                      >收藏</a
                    >
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <!-- 分页器 -->
          <Pagination
            :pageNo="searchParams.pageNo"
            :pageSize="searchParams.pageSize"
            :total="total"
            :continues="5"
            @getPageNo="getPageNo"
          ></Pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import { mapState } from 'vuex'
import { mapGetters } from 'vuex'
import SearchSelector from './SearchSelector/SearchSelector'
export default {
  name: 'Search',
  components: {
    SearchSelector
  },
  data() {
    return {
      searchParams: {
        //一级分类id
        category1Id: '',
        //二级分类id
        category2Id: '',
        //三级分类id
        category3Id: '',
        //分类名字
        categoryName: '',
        //关键字
        keyword: '',
        //排序
        order: '1:desc',
        //分页器用的，代表当前第几页
        pageNo: 1,
        //代表每一页展示数据个数
        pageSize: 5,
        //平台售卖属性
        props: [],
        //品牌
        trademark: ''
      }
    }
  },
  methods: {
    //获取search数据---根据用户的选择获取数据
    getSearchDate() {
      this.$store.dispatch('search/getSearchList', this.searchParams)
    },
    //删除分类名称的面包屑
    removeCategoryName() {
      //将分类Id和分类名称删除 使用undefined的原因：减少每次跳转带的参数，提升性能，进行优化
      this.searchParams.category1Id = undefined
      this.searchParams.category2Id = undefined
      this.searchParams.category3Id = undefined
      this.searchParams.categoryName = undefined
      //修而跳转路径 (通过自己跳转自己来修改路径) 此外，原因使用watch监听了$route，所以当路径发生了改变时，又会自动的发请求，获取search搜索的数据
      this.$router.push({ name: 'search', params: this.$route.params })
    },
    //删除分类关键字的面包屑
    removeKeyword() {
      //将关键字删除
      this.searchParams.keyword = undefined
      //修改路径 (自动重新发请求)
      this.$router.push({ name: 'search', query: this.$route.query })
      //删除搜索框中的文本 (涉及兄弟间通信，使用$bus)
      this.$bus.$emit('clearKeyword')
    },
    //删除品牌的面包屑
    removeTrademark() {
      //删除品牌 这里不用设为underfined 因为：上面使用了split(根据断开参数，将字符串断开为数组)，而underfined.split会报错
      this.searchParams.trademark = ''
      //重新发请求
      this.getSearchDate()
    },
    //自定义事件：用于子向父传参 获取trademark数据
    trademarkInfo(trademark) {
      //整理trademark数据并放入到searchParams.trademark中
      this.searchParams.trademark = `${trademark.tmId}:${trademark.tmName}`
      //发请求
      this.getSearchDate()
    },
    //自定义事件：用于子向父传参 获取attr数据
    attrInfo(attr, aValue) {
      //整理attr数据
      let props = `${attr.attrId}:${aValue}:${attr.attrName}`
      //放入到searchParams.props中
      //数组去重:用indexof判断
      if (this.searchParams.props.indexOf(props) == -1) {
        this.searchParams.props.push(props)
        //发请求
        this.getSearchDate()
      }
    },
    //删除配置属性的面包屑
    removeAttr(index) {
      this.searchParams.props.splice(index, 1)
      this.getSearchDate()
    },
    //改变排序
    changeOrder(flag) {
      //如果点的是相同的
      if (flag == this.searchParams.order.split(':')[0]) {
        this.searchParams.order =
          flag +
          `:${this.searchParams.order.split(':')[1] == 'desc' ? 'asc' : 'desc'}`
      } else {
        //如果点的是不同的
        this.searchParams.order = flag + ':desc'
      }
      this.getSearchDate()
    },
    //自定义事件：用于获取分页器当前页面数
    getPageNo(pageNo) {
      this.searchParams.pageNo = pageNo
      this.getSearchDate()
    }
  },
  beforeMount() {
    //参数合并  Object.assign ：ES6新增语法，合并对象
    Object.assign(this.searchParams, this.$route.params, this.$route.query)
  },
  mounted() {
    //挂载完成后，获取search搜索的数据
    this.getSearchDate()
  },
  computed: {
    // ...mapState({
    //   goodsList:state => state.search.searchList.goodsList
    // })
    ...mapGetters('search', ['goodsList', 'total']),
    isOne() {
      return this.searchParams.order.includes(1)
    },
    isDown() {
      return this.searchParams.order.includes('desc')
    }
  },
  watch: {
    //监听路由是否发生变化，如果变化，重新更新数据发请求
    $route() {
      console.log('s')
      //发请求之前，先将三个分类id都变空，以免下次搜索带上
      this.searchParams.category1Id = undefined
      this.searchParams.category2Id = undefined
      this.searchParams.category3Id = undefined
      this.searchParams.categoryName = undefined
      Object.assign(this.searchParams, this.$route.params, this.$route.query)
      this.getSearchDate()
    }
  }
}
</script>

<style lang="less" scoped>
.main {
  margin: 10px 0;

  .py-container {
    width: 1200px;
    margin: 0 auto;

    .bread {
      margin-bottom: 5px;
      overflow: hidden;

      .sui-breadcrumb {
        padding: 3px 15px;
        margin: 0;
        font-weight: 400;
        border-radius: 3px;
        float: left;

        li {
          display: inline-block;
          line-height: 18px;

          a {
            color: #666;
            text-decoration: none;

            &:hover {
              color: #4cb9fc;
            }
          }
        }
      }

      .sui-tag {
        margin-top: -5px;
        list-style: none;
        font-size: 0;
        line-height: 0;
        padding: 5px 0 0;
        margin-bottom: 18px;
        float: left;

        .with-x {
          font-size: 12px;
          margin: 0 5px 5px 0;
          display: inline-block;
          overflow: hidden;
          color: #000;
          background: #f7f7f7;
          padding: 0 7px;
          height: 20px;
          line-height: 20px;
          border: 1px solid #dedede;
          white-space: nowrap;
          transition: color 400ms;
          cursor: pointer;

          i {
            margin-left: 10px;
            cursor: pointer;
            font: 400 14px tahoma;
            display: inline-block;
            height: 100%;
            vertical-align: middle;
          }

          &:hover {
            color: #28a3ef;
          }
        }
      }
    }

    .details {
      margin-bottom: 5px;

      .sui-navbar {
        overflow: visible;
        margin-bottom: 0;

        .filter {
          min-height: 40px;
          padding-right: 20px;
          background: #fbfbfb;
          border: 1px solid #e2e2e2;
          padding-left: 0;
          border-radius: 0;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);

          .sui-nav {
            position: relative;
            left: 0;
            display: block;
            float: left;
            margin: 0 10px 0 0;

            li {
              float: left;
              line-height: 18px;

              a {
                display: block;
                cursor: pointer;
                padding: 11px 15px;
                color: #777;
                text-decoration: none;
              }

              &.active {
                a {
                  background: #e1251b;
                  color: #fff;
                }
              }
            }
          }
        }
      }

      .goods-list {
        margin: 20px 0;

        ul {
          display: flex;
          flex-wrap: wrap;

          li {
            height: 100%;
            width: 20%;
            margin-top: 10px;
            line-height: 28px;

            .list-wrap {
              .p-img {
                padding-left: 15px;
                width: 215px;
                height: 255px;

                a {
                  color: #666;

                  img {
                    max-width: 100%;
                    height: auto;
                    vertical-align: middle;
                  }
                }
              }

              .price {
                padding-left: 15px;
                font-size: 18px;
                color: #c81623;

                strong {
                  font-weight: 700;

                  i {
                    margin-left: -5px;
                  }
                }
              }

              .attr {
                padding-left: 15px;
                width: 85%;
                overflow: hidden;
                margin-bottom: 8px;
                min-height: 38px;
                cursor: pointer;
                line-height: 1.8;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;

                a {
                  color: #333;
                  text-decoration: none;
                }
              }

              .commit {
                padding-left: 15px;
                height: 22px;
                font-size: 13px;
                color: #a7a7a7;

                span {
                  font-weight: 700;
                  color: #646fb0;
                }
              }

              .operate {
                padding: 12px 15px;

                .sui-btn {
                  display: inline-block;
                  padding: 2px 14px;
                  box-sizing: border-box;
                  margin-bottom: 0;
                  font-size: 12px;
                  line-height: 18px;
                  text-align: center;
                  vertical-align: middle;
                  cursor: pointer;
                  border-radius: 0;
                  background-color: transparent;
                  margin-right: 15px;
                }

                .btn-bordered {
                  min-width: 85px;
                  background-color: transparent;
                  border: 1px solid #8c8c8c;
                  color: #8c8c8c;

                  &:hover {
                    border: 1px solid #666;
                    color: #fff !important;
                    background-color: #666;
                    text-decoration: none;
                  }
                }

                .btn-danger {
                  border: 1px solid #e1251b;
                  color: #e1251b;

                  &:hover {
                    border: 1px solid #e1251b;
                    background-color: #e1251b;
                    color: white !important;
                    text-decoration: none;
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>
