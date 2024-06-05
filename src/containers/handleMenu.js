// let menus = [
//   {
//     name: "首页",
//     path: "/",
//     component: "Layout",
//     icon: "el-icon-myshouye",
//     hidden: false,
//     children: [],
//   },
//   {
//     name: "文章管理",
//     path: "/article-submenu",
//     component: "Layout",
//     icon: "el-icon-mywenzhang-copy",
//     hidden: false,
//     children: [
//       {
//         name: "发布文章",
//         path: "/articles",
//         component: "/article/Article.jsx",
//         icon: "el-icon-myfabiaowenzhang",
//         hidden: false,
//         children: null,
//       },
//       {
//         name: "修改文章",
//         path: "/articles/*",
//         component: "/article/Article.jsx",
//         icon: "el-icon-myfabiaowenzhang",
//         hidden: true,
//         children: null,
//       },
//       {
//         name: "文章列表",
//         path: "/article-list",
//         component: "/article/ArticleList.jsx",
//         icon: "el-icon-mywenzhangliebiao",
//         hidden: false,
//         children: null,
//       },
//       {
//         name: "分类管理",
//         path: "/categories",
//         component: "/category/Category.jsx",
//         icon: "el-icon-myfenlei",
//         hidden: false,
//         children: null,
//       },
//       {
//         name: "标签管理",
//         path: "/tags",
//         component: "/tag/Tag.jsx",
//         icon: "el-icon-myicontag",
//         hidden: false,
//         children: null,
//       },
//     ],
//   },
// ];
import { lazyLoad } from "../router/index.jsx";
const handleMenu = (menus, parentPath = "") => {
  return menus
    .filter((menu) => !menu.hidden)
    .map((menu) => {
      if (!menu.name) {
        let temMenu = menu.children[0];
        temMenu.path = menu.path;
        menu = temMenu;
        console.log("[Log] menu-->", menu);
      }
      const transformedMenu = {
        label: menu.name,
        key: parentPath + menu.path,
        icon: null,
        hidden: menu.hidden,
        children:
          menu.children?.length > 0
            ? handleMenu(menu.children, menu.path)
            : null,
      };
      return transformedMenu;
    });
};
const handleRoute = (menus) => {
  const modules = import.meta.glob("@/views/**/*.js"); // 获取所有的
  if (!menus.length) {
    return [];
  }
  return menus
    .filter((menu) => !menu.hidden)
    .map((menu) => {
      const transformedMenu = {
        path: menu.path,
        element: menu.component,
        children: menu.children?.length > 0 ? handleRoute(menu.children) : null,
      };
      return transformedMenu;
    });
};
// 因为用redux进行这么存储会报错 序列化的问题所以只能在写一个方法用到的时候进行给component赋值
const setComponentRoute = (menus) => {
  if (!menus.length) {
    return [];
  }
  return menus
    .filter((menu) => !menu.hidden)
    .map((menu) => {
      let ele = null;
      if (menu.element === "Layout") {
        ele = lazyLoad("/Index");
      } else {
        ele = lazyLoad(menu.element);
      }
      const transformedMenu = {
        path: menu.path,
        element: ele,
        children:
          menu.children?.length > 0
            ? setComponentRoute(
                menu.children.map((child) => ({
                  ...child,
                  path:
                    child.path.startsWith("/") && child.path !== "/"
                      ? child.path.substring(1)
                      : child.path,
                }))
              )
            : null,
      };
      return transformedMenu;
    });
};
export { handleMenu, handleRoute, setComponentRoute };
