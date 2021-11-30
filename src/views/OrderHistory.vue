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
              <th>支払い状況</th>
              <th>支払い方法</th>
              <th>商品名</th>
              <th>トッピング</th>
              <th>金額(税込)</th>
            </tr>
          </thead>
          <div>{{ errorMessage }}</div>
          <tbody>
            <tr
              v-for="(order, orderIndex) of orderHistoryList"
              v-bind:key="order.id"
            >
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
              <td>
                <div
                  v-for="orderItem of order.orderItemList"
                  v-bind:key="orderItem.id"
                >
                  {{ orderItem.item.name }}
                </div>
              </td>
              <td>
                <div
                  v-for="orderItem of order.orderItemList"
                  v-bind:key="orderItem.id"
                >
                  <div
                    v-for="orderTopping of orderItem.orderToppingList"
                    v-bind:key="orderTopping.id"
                  >
                    {{ orderTopping.topping.name }}
                  </div>
                </div>
              </td>
              <td class="cart-item-name">
                <span>{{ order.changeFormatOfTotalPrice + "円" }}</span>
              </td>
              <td class="cart-item-name">
                <button
                  class="waves-effect waves-light btn"
                  type="button"
                  @click="reOrder(orderIndex)"
                >
                  <span>再注文</span>
                </button>
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
import { Topping } from "../types/Topping";

@Component
export default class OrderHistory extends Vue {
  //注文履歴一覧を格納する配列
  private orderHistoryList = Array<Order>();
  private errorMessage = "";

  /**
   * Vuexストアのアクション経由で非同期でWebAPIから注文履歴一覧を取得する.
   *
   * @remarks 全商品一覧をAPIからアクションで取得
   * ミューテーションで商品オブジェクト化したものを注文一覧配列に格納
   *
   */
  async created(): Promise<void> {
    await this["$store"].dispatch("getOrderHistoryList");
    if (this["$store"].getters.getAllOrderHistoryLists.length == 0) {
      this.errorMessage = "注文履歴がありません";
    } else {
      this.errorMessage = "";
    }
    this.orderHistoryList = this["$store"].getters.getAllOrderHistoryLists;
  }

  /**
   * 注文履歴から再注文する
   */
  reOrder(orderIndex: number): void {
    let itemCount =
      this["$store"].getters.getAllOrderHistoryLists[orderIndex].orderItemList
        .length;

    // カートの中身を空にする
    this["$store"].commit("resetOrderItemList");

    for (let i = 0; i < itemCount; i++) {
      let toppingList = new Array<Topping>();
      let toppingCount =
        this["$store"].getters.getAllOrderHistoryLists[orderIndex]
          .orderItemList[i].orderToppingList.length;
      for (let j = 0; j < toppingCount; j++) {
        toppingList.push(
          this["$store"].getters.getAllOrderHistoryLists[orderIndex]
            .orderItemList[i].orderToppingList[j].topping
        );
      }

      // カートに注文履歴の商品を追加する
      this["$store"].commit("addItemToCart", {
        size: this["$store"].getters.getAllOrderHistoryLists[orderIndex]
          .orderItemList[i].size,

        orderToppingList: toppingList,

        quantity:
          this["$store"].getters.getAllOrderHistoryLists[orderIndex]
            .orderItemList[i].quantity,
        orderItem: {
          id: this["$store"].getters.getAllOrderHistoryLists[orderIndex]
            .orderItemList[i].item.id,
          name: this["$store"].getters.getAllOrderHistoryLists[orderIndex]
            .orderItemList[i].item.name,
          description:
            this["$store"].getters.getAllOrderHistoryLists[orderIndex]
              .orderItemList[i].item.description,
          priceM:
            this["$store"].getters.getAllOrderHistoryLists[orderIndex]
              .orderItemList[i].item.priceM,
          priceL:
            this["$store"].getters.getAllOrderHistoryLists[orderIndex]
              .orderItemList[i].item.priceL,
          imagePath:
            this["$store"].getters.getAllOrderHistoryLists[orderIndex]
              .orderItemList[i].item.imagePath,
          deleted:
            this["$store"].getters.getAllOrderHistoryLists[orderIndex]
              .orderItemList[i].item.deleted,
        },
      });
    }

    this["$router"].push("/cartList");
  }
}
</script>

<style scoped>
.top-wrapper {
  min-height: 97vh;
}
</style>
