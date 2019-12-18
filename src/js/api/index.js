import hw from './hw';
import until from './until';
import user from './user';
import home from './home';
import other from './other';
import course from './course';
import calc from './calc';

let api = {
  hw,
  until,
  user,
  home,
  other,
  course,
  calc
};

export function mixin() {
  function setup () {
    this.$api = api
  }
  return {
    beforeLoad: setup,
    created: setup,
  }
}

const Plugin = {
  install({ Page, Component }){
    Page.mixin(mixin());
    Component.mixin(mixin());
  }
};

export default Plugin;
