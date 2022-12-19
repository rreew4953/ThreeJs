//  目标：使用控制器查看 3d 物体

import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

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
cube.position.set(5, 0, 0);

// 缩放物体 方法同移动
cube.scale.set(3, 2, 1);

// 旋转 Math.PI === 180  (x, y, z, 旋转顺序)
cube.rotation.set(Math.PI / 4, 0, 0, "XYZ");

// 将几何体添加进场景
scene.add(cube);

console.log(cube); // 具有一些 属性
// position 是一个 vector3 三维向量对象  x y z

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

// 添加坐标轴辅助器 单位因该是 m
const axesHelper = new THREE.AxesHelper(6);
scene.add(axesHelper);

// 此时轨道控制器看起来不起作用 因为屏幕没有刷新帧率导致
// 添加动画帧函数
function render() {
  // 位置移动
  cube.position.x += 0.01;
  cube.rotation.x += 0.01;
  if (cube.position.x >= 5) {
    cube.position.x = 0;
  }
  renderer.render(scene, camera);
  // 调用下一帧的时候再一次渲染
  requestAnimationFrame(render);
}
render();
