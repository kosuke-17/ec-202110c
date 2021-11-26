<template>
  <div class="top-wrapper">
    <div class="container">
      <h1 class="page-title">注文履歴</h1>
      <!-- table -->
      <div class="row">
        <table class="striped">
          <thead>
            <tr>
              <th class="cart-table-th">注文日</th>
              <th>配達日</th>
              <th>現在の状況</th>
              <th>支払い方法</th>
              <th>商品名</th>
              <th>合計金額</th>
            </tr>
          </thead>
          <tbody v-for="order of orderHistoryList" v-bind:key="order.id">
            <tr>
              <td class="cart-item-name">
                <span>{{ order.orderDate }}</span>
              </td>
              <td class="cart-item-name">
                <span>{{ order.changeFormatOfDeliveryTime }}</span>
              </td>
              <td class="cart-item-name">
                <span>{{ order.changeFormatOfStatus }}</span>
              </td>
              <td class="cart-item-name">
                <span>{{ order.changeFormatOfPaymentMethod }}</span>
              </td>
              <td class="cart-item-name">
                <span>{{ order.orderItemList[0].item.name }}</span>
              </td>
              <td class="cart-item-name">
                <span>{{ order.totalPrice + "円" }}</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <!-- end container -->
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Order } from "../types/Order";

@Component
export default class OrderHistory extends Vue {
  //注文履歴一覧を格納する配列
  private orderHistoryList = Array<Order>();

  /**
   * Vuexストアのアクション経由で非同期でWebAPIから注文履歴一覧を取得する.
   *
   * @remarks 全商品一覧をAPIからアクションで取得
   * ミューテーションで商品オブジェクト化したものを注文一覧配列に格納
   *
   */
  async created(): Promise<void> {
    await this["$store"].dispatch("getOrderHistoryList");

    this.orderHistoryList = this["$store"].getters.getAllOrderHistoryLists;
  }
}
</script>

<style></style>
