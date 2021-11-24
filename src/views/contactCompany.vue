<template>
  <div class="container">
    <div class="row login-page">
      <div class="col s12 z-depth-6 card-panel">
        <h1>お問い合わせ</h1>
        <!-- <div class="error">{{ errorMessage }}</div> -->
        <form class="login-form">
          <div class="row">
            <div class="input-field col s12">
              <i class="material-icons prefix">account_circle</i>
              <input class="validate" id="name" type="email" v-model="name" />
              <label for="name" data-error="wrong" data-success="right"
                >お名前</label
              >
            </div>
          </div>
          <div class="row">
            <div class="input-field col s12">
              <i class="material-icons prefix">mail_outline</i>
              <input
                class="validate"
                id="mailAddress"
                type="email"
                v-model="mailAddress"
              />
              <label for="mailAddress" data-error="wrong" data-success="right"
                >メールアドレス</label
              >
            </div>
          </div>
          <div class="row">
            <div class="input-field col s12">
              <i class="material-icons prefix">mode_edit</i>
              <textarea
                id="textarea"
                class="materialize-textarea"
                v-model="content"
              />
              <label for="textarea" data-error="wrong" data-success="right"
                >お問い合わせ内容</label
              >
            </div>
          </div>
          <div class="row login-btn">
            <button class="btn" type="button">
              <span>送信</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style></style>
