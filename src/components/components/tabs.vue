<script>
  export const tabs = {
    template: `<div class="tabs"><slot></slot></div>`
  }
  export const tabPane = {
    template: `<div class="tab-pane"><slot></slot></div>`
  }
</script>
<style lang="less">
  @import "../../assets/less/tabs.less";
</style>
