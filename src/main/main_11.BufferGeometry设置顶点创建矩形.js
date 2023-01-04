//  目标：掌握 gsap 动画库

import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
// 导入动画库
import gsap from "gsap";

// 导入 dat.gui 库
import * as dat from "dat.gui";

// 1、创建场景
const scene = new THREE.Scene();

// 2、创建相机 透视和正交相机。具体看文档
// 75度的视角 宽高比 近距离裁剪 远距离裁剪
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerHeight / window.innerWidth,
  0.1,
  1000
);

//object3D => camera => 是对象
// 设置相机位置 X Y Z 轴线
camera.position.set(0, 0, 10);
//  添加相机到场景
scene.add(camera);

// 添加物体 缓冲立方体 (长 宽 高)
const cubeGeomertry = new THREE.BoxGeometry(1, 1, 1);
// 创建材质
const cubeMaterial = new THREE.MeshBasicMaterial({ color: "red" });
// 基于集合体和材质创建物体
const cube = new THREE.Mesh(cubeGeomertry, cubeMaterial);

// 对物体的属性 操作
// 修改物体的位置  cube.position.x y z = 或 set（）
// position 是一个 vector3 三维向量对象  x y z
cube.position.set(0, 0, 0);

// 缩放物体 方法同移动
cube.scale.set(3, 2, 1);

// 旋转 Math.PI === 180  (x, y, z, 旋转顺序)
cube.rotation.set(Math.PI / 4, 0, 0, "XYZ");

// 将几何体添加进场景
scene.add(cube);

console.log(cube); // 具有一些 属性

// 创建 GUI 面板
const gui = new dat.GUI();
gui
  .add(cube.position, "x")
  .min(0)
  .max(5)
  .step(0.01)
  .name("往X轴移动")
  .onChange((value) => {
    console.log("值被修改了", value);
  })
  .onFinishChange((value) => {
    console.log("完全停下来", value);
  });

// 设置颜色对象
const params = {
  color: "#ffff00",
  fn: () => {
    gsap.to(cube.position, { x: 5, duration: 2, yoyo: true, repeat: -1 });
  },
};
// 修改物体颜色
gui.addColor(params, "color").onChange((value) => {
  console.log("颜色改变了", value);
  cube.material.color.set(value);
});
// 添加显示隐藏属性选项框
gui.add(cube, "visible").name("是否显示");
// 设置按钮点击事件
// gui.add(params, "fn").name("物体运动");

// 打组
let folder = gui.addFolder('设置立方体')
folder.add(cube.material,'wireframe')

// 点击暂停没有从暂停的位置重新触发
folder.add(params, "fn").name("物体运动");

// 初始化渲染器
const renderer = new THREE.WebGL1Renderer();
// 设置渲染的尺寸大小
renderer.setSize(window.innerHeight, window.innerWidth);
// 渲染的是一个 cavas 元素 将其添加到 body 上
document.body.appendChild(renderer.domElement);

// 使用渲染器，通过相机将场景渲染进来
// renderer.render(scene, camera);

// 创建轨道控制器 控制相机和 cavas 画的 dom 元素
const controls = new OrbitControls(camera, renderer.domElement);

// 设置控制器阻尼
controls.enableDamping = true;

// 添加坐标轴辅助器 单位因该是 m
const axesHelper = new THREE.AxesHelper(6);
scene.add(axesHelper);

// 监听鼠标事件
window.addEventListener("dblclick", () => {
  const fullScreen = renderer.domElement.requestFullscreen();
  if (!fullScreen) {
    // 双击控制全屏
    renderer.domElement.requestFullscreen();
  } else {
    document.exitFullscreen();
  }
});

// 此时轨道控制器看起来不起作用 因为屏幕没有刷新帧率导致
// 添加动画帧函数 (time) 为自动传入的默认参数
function render() {
  // 设置阻尼
  controls.update();
  // 实时渲染
  renderer.render(scene, camera);
  // 调用下一帧的时候再一次渲染
  requestAnimationFrame(render);
}
render();

// 监听鼠标事件
window.addEventListener("resize", () => {
  // 更新摄像头
  camera.aspect = window.innerWidth / window.innerHeight;
  // 更新摄像机的投影矩阵
  camera.updateProjectionMatrix();

  // 更新渲染器
  renderer.setSize(window.innerWidth, window.innerHeight);
  // 设置渲染器的设备像素比
  renderer.setPixelRatio(window.devicePixelRatio);
});
