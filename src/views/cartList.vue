<template>
  <div class="top-wrapper">
    <div class="container">
      <h1 class="page-title">ショッピングカート</h1>
      <!-- table -->
      <div class="row">
        <table class="striped">
          <thead>
            <tr>
              <th class="cart-table-th">商品名</th>
              <th>サイズ、価格(税抜)、数量</th>
              <th>トッピング、価格(税抜)</th>
              <th>小計</th>
            </tr>
          </thead>
          <tbody v-for="(item, index) of orderItemList" v-bind:key="item.id">
            <tr>
              <td class="cart-item-name">
                <div class="cart-item-icon">
                  <img :src="item.item.imagePath" />
                </div>
                <span>{{ item.item.name }}</span>
              </td>
              <td>
                <span class="price">&nbsp;{{ item.size }}</span
                >&nbsp;&nbsp;{{ itemPrice(index) }}円 &nbsp;&nbsp;
                {{ item.quantity }}個
              </td>
              <td>
                <ul
                  v-for="topping of item.orderToppingList"
                  v-bind:key="topping.id"
                >
                  <li>{{ topping.name }}</li>
                </ul>
              </td>
              <td>
                <div class="text-center">
                  {{
                    item.calcSubTotalPrice(
                      item.size,
                      item.orderToppingList.length,
                      item.quantity
                    )
                  }}円
                </div>
              </td>
              <td>
                <button class="btn" type="button">
                  <span>削除</span>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="row cart-total-price">
        <div>消費税：8,000円</div>
        <div>ご注文金額合計：38,000円 (税込)</div>
      </div>
      <div class="row order-confirm-btn">
        <button
          class="btn"
          type="button"
          onclick="location.href='order_confirm.html'"
        >
          <span>注文に進む</span>
        </button>
      </div>
    </div>
    <!-- end container -->
  </div>
</template>

<script lang="ts">
import { OrderItem } from "@/types/OrderItem";
import { Component, Vue } from "vue-property-decorator";

@Component
export default class cartList extends Vue {
  /**
   * ショッピングカートに入っている商品の配列を返す.
   *
   * @returns ショッピングカートに入っている商品の配列
   */
  get orderItemList(): Array<OrderItem> {
    return this["$store"].getters.getOrderItemList;
  }

  /**
   * ショッピングカートで商品のサイズごとの単価を表示する.
   *
   * @returns 商品の単価
   */
  itemPrice(index: number): number {
    let orderItemPrice = new Array<number>();
    // let id = this.orderItemList[].id - 1;
    for (const orderItem of this.orderItemList) {
      if (orderItem.size === "M") {
        orderItemPrice.push(orderItem.item.priceM);
      } else if (orderItem.size === "L") {
        orderItemPrice.push(orderItem.item.priceL);
      }
    }
    return orderItemPrice[index];
  }
}
</script>

<style scoped>
.cart-table-th {
  text-align: center;
}
.cart-item-icon img {
  margin: auto;
  display: block;
  border-radius: 20px;
  width: 100px;
  height: 100px;
  padding: 0 0 15px 0;
}
.cart-item-name {
  text-align: center;
  font-size: 15px;
}

.cart-total-price {
  font-size: 35px;
  text-align: center;
}

.order-confirm-btn {
  text-align: center;
}
.price {
  background-color: #ff4500;
  border-radius: 50%; /* 角丸にする設定 */
  color: black;
}
</style>
