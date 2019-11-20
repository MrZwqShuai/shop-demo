import { observable, action } from "mobx";
class MyActionSheetStore {
  @observable visible: boolean = false;

  /**
   * toggle action sheet show or hide
   */
  @action
  toggleActionSheet(): void {
    this.visible = !this.visible;
  }

  /**
   *
   * @param visible action show or hide
   */
  @action
  setActionSheetVisible(visible: boolean): void {
    this.visible = visible;
  }
}

export default new MyActionSheetStore();
