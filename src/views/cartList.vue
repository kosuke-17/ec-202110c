<template>
  <div class="top-wrapper">
    <div class="container">
      <h1 class="page-title">ショッピングカート</h1>
      <!-- table -->
      <div class="row">
        <div class="card-noItemList">
          <div v-if="orderItemList.length === 0">
            <div class="row">
              <div class="col s12 m6">
                <div class="card blue-grey darken-1">
                  <div class="card-content white-text">
                    <span class="card-title"
                      >買い物かごには商品が入っていません。</span
                    >
                    <p>
                      現在、買い物かごには商品が入っていません。ぜひお買い物をお楽しみください。
                      ご利用をお待ちしております。 トップページはこちら
                    </p>
                  </div>
                  <div class="card-action">
                    <a href="#">商品一覧画面はこちら</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <table class="striped" v-if="orderItemList.length">
          <thead>
            <tr>
              <th class="cart-table-th">商品名</th>
              <th>サイズ、価格(税抜)、数量</th>
              <th>トッピング、価格(税抜)</th>
              <th>小計</th>
            </tr>
          </thead>
          <tbody
            v-for="(orderItem, index) of orderItemList"
            v-bind:key="orderItem.id"
          >
            <tr>
              <td class="cart-item-name">
                <div class="cart-item-icon">
                  <img :src="orderItem.item.imagePath" />
                </div>
                <span>{{ orderItem.item.name }}</span>
              </td>
              <td>
                <span class="price">&nbsp;{{ orderItem.size }}</span
                >&nbsp;&nbsp;{{ orderItem.orderItemUnitPrice(index) }}円
                &nbsp;&nbsp; {{ orderItem.quantity }}個
              </td>
              <td>
                <ul
                  v-for="topping of orderItem.orderToppingList"
                  v-bind:key="topping.id"
                >
                  <li>
                    {{ topping.name }}&nbsp;（{{
                      orderItem.toppingPrice(orderItem.size)
                    }}円）
                  </li>
                </ul>
              </td>
              <td>
                <div class="text-center">
                  {{
                    orderItem.calcSubTotalPrice(
                      orderItem.size,
                      orderItem.orderToppingList.length,
                      orderItem.quantity
                    )
                  }}円
                </div>
              </td>
              <td>
                <button class="btn" type="button" @click="deleteItem(index)">
                  <span>削除</span>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="row cart-total-price">
        <div>消費税：{{ taxPrice.toLocaleString() }}円</div>
        <div>
          ご注文金額合計：{{ totalPriceIncludeTax.toLocaleString() }}円 (税込)
        </div>
      </div>
      <div class="row order-confirm-btn">
        <button class="btn" type="button" @click="goToOrder">
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
  private orderItemList = new Array<OrderItem>();
  /**
   * ショッピングカートに入っている商品の配列を変数に格納.
   */
  created(): void {
    this.orderItemList = this["$store"].getters.getOrderItemList;
  }
  /**
   * ショッピングカートに入っている商品の配列を返す.
   *
   * @returns ショッピングカートに入っている商品の配列
   *          ログインしていなければ、ログイン画面に戻るように処理を実装
   */
  goToOrder(): void {
    if (this.$store.state.isLogin) {
      this.$router.push("/orderConfirm");
    } else {
      alert("ログインしてないため、ログイン画面に移動します。");
      this.$router.push("/loginUser");
    }
  }

  /**
   * ショッピングカートに入っている商品を削除する.
   */
  deleteItem(index: number): void {
    this["$store"].commit("deleteItem", {
      index: index,
    });
    this.orderItemList = this["$store"].getters.getOrderItemList;
  }

  /**
   *税抜き合計金額を計算するして返す.
   *
   * @remarks ショッピングカートに入っている商品の税抜き合計金額を計算して返す
   * @returns ショッピングカートに入っている商品
   */
  private totalPriceWithoutTax(): number {
    let totalPriceWithoutTax = 0;
    for (let orderItem of this["$store"].getters.getOrderItemList) {
      totalPriceWithoutTax += orderItem.calcSubTotalPrice(
        orderItem.size,
        orderItem.orderToppingList.length,
        orderItem.quantity
      );
    }
    return totalPriceWithoutTax;
  }

  /**
   * 消費税を計算して返す.
   *
   * @remarks ショッピングカートに入っている商品の消費税金額を計算して返す
   * @returns ショッピングカートに入っている商品の消費税金額
   */
  get taxPrice(): number {
    const tax = 0.1;
    return this.totalPriceWithoutTax() * tax;
  }

  /**
   * 合計金額を計算して返す.
   *
   * @remarks ショッピングカートに入っている商品の合計金額を計算して返す
   * @returns ショッピングカートに入っている商品の合計金額
   */
  get totalPriceIncludeTax(): number {
    return this.totalPriceWithoutTax() + this.taxPrice;
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
.card-noItemList {
  text-align: center;
}
</style>
