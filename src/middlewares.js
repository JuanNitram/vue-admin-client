import store from "./store";

export default {
  checkSections: function(to) {
    if (to.meta.section != "login") {
      if (to.meta.section == "dashboard") return true;

      let sections = store.state.user.sections;
      let element = sections.find(s => {
        return s.name == to.meta.section;
      });

      if (element) return true;
        return false;
    }
    return true;
  },
  validateSession: function() {
    let hours = 6;
    let now = new Date().getTime();
    let setupTime = localStorage.getItem("setupTime");
    if (setupTime == null) {
      localStorage.setItem("setupTime", now);
    } else {
      if (now - setupTime > hours * 60 * 60 * 1000) {
        localStorage.clear();
        localStorage.setItem("setupTime", now);
      }
    }
  }
};
